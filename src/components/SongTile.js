import React, { useState, useEffect } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import { searchSongs } from "../services/spotify";
import { getSongInfo, updateCurrentSong } from "../services/db";

function SongTile(props) {
  const { docId, currentPartner, partner } = props;
  const [status, setStatus] = useState("add");
  const [songSearch, setSongSearch] = useState("");
  const [songList, setSongList] = useState([]);
  const [song, setSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = React.useRef(new Audio(song?.preview));

  useEffect(() => {
    const fetch = async (tilePartner) => {
      const song = await getSongInfo(docId, tilePartner);
      console.log("fetched song", song);
      if (!song) {
        return;
      }
      setSong(song[tilePartner]);
      setStatus("song");
    };
    if (currentPartner == partner) {
      console.log("fetching current partner song");
      fetch(currentPartner);
    } else {
      console.log("fetching partner song");
      fetch(partner);
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (songSearch.length > 0) {
        const data = await searchSongs(songSearch);
        setSongList(data.slice(0, 3));
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        fetch();
      }
      if (e.key === "Escape") {
        setSongList([]);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [songSearch]);

  const handleSongSelection = (song) => {
    console.log(song);
    const songData = {
      id: song.id,
      name: song.name,
      artist: song.artists.map((artist) => artist.name).join(", "),
      image: song.album.images[0].url,
      preview: song.preview_url,
      url: song.external_urls.spotify,
    };
    console.log(songData);
    updateCurrentSong(docId, partner, songData);
    setSong(songData);
    setSongList([]);
    setStatus("song");
  };

  const handlePlayPreview = () => {
    if (song.preview) {
      audioRef.current.src = song.preview;
      audioRef.current.play();
      setPlaying(true);
    } else {
      window.open(song.url, "_blank");
    }
  };

  const handleStopPreview = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  return (
    <div className="small-tile song-tile">
      {status === "song" && song != null && (
        <>
          <div className="tile-image">
            <div className="dark-overlay"></div>
            <div className="song-play-button">
              {!playing && <FaPlay onClick={handlePlayPreview} />}
              {playing && <FaStop onClick={handleStopPreview} />}
            </div>
            <img src={song?.image} />
          </div>
          <div className="tile-song-info">
            <div className="song-title">{song?.name}</div>
            <div className="song-artist">{song?.artist}</div>
          </div>
        </>
      )}
      {status === "add" && currentPartner != partner && song == null && (
        <div className="add-song">
          <div className="add-song-text">
            Waiting for your partner to add their song.
          </div>
        </div>
      )}
      {status === "add" && currentPartner == partner && song == null && (
        <div className="add-song" onClick={() => setStatus("select")}>
          <div className="add-song-icon">+</div>
          <div className="add-song-text">Add Song</div>
        </div>
      )}
      {status === "select" && currentPartner == partner && song == null && (
        <div className="select-song">
          <div className="select-song-text">Select Song</div>
          <input
            type="text"
            placeholder="Search for a song"
            onChange={(e) => setSongSearch(e.target.value)}
          />
          <div className="select-song-list">
            {songList.length > 0 &&
              songList.map((song) => (
                <div
                  key={song.id}
                  className="song-list-item"
                  onClick={() => {
                    handleSongSelection(song);
                  }}
                >
                  <img src={song.album.images[0].url} />
                  <div className="song-list-info">
                    <div className="song-list-title">{song.name}</div>
                    <div className="song-list-artist">
                      {song.artists.map((artist) => artist.name).join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            {songList.length > 0 && (
              <div className="song-list-item" onClick={() => setSongList([])}>
                <div className="song-list-info">
                  <div className="song-list-title">Exit Search</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SongTile;
