import React, { useEffect, useState } from "react";
import {
  getCoupleDoc,
  incrementCuddles,
  incrementMissYou,
  updateCity,
  updateCoords,
  updateMilesApart,
} from "../services/db";
import { daysFromToday } from "../services/utils";
import {
  distance,
  getCity,
  getLocation,
  getTimezone,
} from "../services/location";
import { getWeather } from "../services/weather";
import moment from "moment-timezone";
import { getBackgroundImage } from "../services/utils";

import CityTile from "../components/CityTile";
import GameTile from "../components/GameTile";
import StatTile from "../components/StatTile";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Dashboard(props) {
  const { user } = props;
  const [couple, setCouple] = useState(null);
  const [partnerNumber, setPartnerNumber] = useState(null);
  const [weather, setWeather] = useState({ weather1: null, weather2: null });

  useEffect(() => {
    const fetch = async () => {
      const couple = await getCoupleDoc(user.email);
      setCouple(couple);
      setPartnerNumber(user.email === couple.partner1 ? 1 : 2);
      setWeather({
        weather1: await getWeather(couple.cords1.lat, couple.cords1.lng),
        weather2: await getWeather(couple.cords2.lat, couple.cords2.lng),
      });
    };
    fetch();
  }, [user]);

  useEffect(() => {
    if (!couple) {
      return;
    }
    const fetch = async () => {
      // Update city
      const newCords = await getLocation();

      if (
        distance(couple[`cords${partnerNumber}`], newCords) > 10 ||
        !couple[`cords${partnerNumber}`]
      ) {
        updateCoords(couple?.id, `cords${partnerNumber}`, newCords);
        updateMilesApart(
          couple?.id,
          parseInt(distance(newCords, couple.cords2))
        );

        const city = await getCity(newCords.lat, newCords.lng);
        const timezone = await getTimezone(newCords.lat, newCords.lng);
        updateCity(couple?.id, `city${partnerNumber}`, city, timezone);
      }
    };
    fetch();
  }, [couple]);

  if (!couple) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="col fade-in">
        <div className="row">
          <CityTile
            bg={getBackgroundImage(
              couple?.city2?.city,
              moment.tz(couple?.city2?.timezone).format("H"),
              weather.weather2?.rain
            )}
            temp={weather.weather2?.temp || 0}
            timezone={couple?.city2?.timezone || "America/New_York"}
            city={couple?.city2?.city || <Skeleton />}
          />
          <CityTile
            bg={getBackgroundImage(
              couple?.city1?.city,
              moment.tz(couple?.city1?.timezone).format("H"),
              weather.weather1?.rain
            )}
            temp={weather.weather1?.temp || 0}
            timezone={couple?.city1?.timezone || "America/New_York"}
            city={couple?.city1?.city || <Skeleton />}
          />
        </div>
        <div className="row">
          <StatTile
            score={couple?.milesApart ? `${couple?.milesApart}` : 0}
            name="miles apart"
          />
          <StatTile
            score={couple?.cuddles || 0}
            name="cuddles"
            click={() => incrementCuddles(couple?.id, couple, user.displayName)}
            setCouple={setCouple}
          />
          <StatTile
            score={daysFromToday(couple?.daysLeft) || 0}
            name="days left"
            setCouple={setCouple}
          />
          <StatTile
            score={couple?.missYou || 0}
            name="miss you"
            click={() => incrementMissYou(couple?.id, couple, user.displayName)}
            setCouple={setCouple}
          />
        </div>
        <div className="row">
          <GameTile
            gameName="Punch Buggy"
            gameId="punchBuggy"
            player1={couple?.partnerName1 || <Skeleton />}
            score1={
              couple?.punchBuggy?.player1 ? `${couple?.punchBuggy?.player1}` : 0
            }
            player2={couple?.partnerName2 || <Skeleton />}
            score2={
              couple?.punchBuggy?.player2 ? `${couple?.punchBuggy?.player2}` : 0
            }
            activePlayer={
              user?.email === couple?.partner1 ? "player1" : "player2"
            }
            setCouple={setCouple}
            couple={couple}
          />
          <GameTile
            gameName="Flick Mini"
            gameId="flickMini"
            player1={couple?.partnerName1 || <Skeleton />}
            score1={
              couple.flickMini.player1 ? `${couple.flickMini.player1}` : 0
            }
            player2={couple?.partnerName2 || <Skeleton />}
            score2={
              couple?.flickMini?.player2 ? `${couple?.flickMini?.player2}` : 0
            }
            activePlayer={
              user?.email === couple?.partner1 ? "player1" : "player2"
            }
            setCouple={setCouple}
            couple={couple}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
