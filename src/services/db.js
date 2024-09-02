import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  increment,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { sendTextMessage } from "./message";
Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("");
};
// var date = new Date();
// new Date().yyyymmdd();

const getCoupleDoc = async (email) => {
  const coupleRef = collection(db, "couples");
  const query1 = query(coupleRef, where("partner1", "==", email));
  const querySnapshot = await getDocs(query1);
  if (!querySnapshot.empty) {
    const data = querySnapshot.docs[0].data();
    data["id"] = querySnapshot.docs[0].id;
    return data;
  }

  const query2 = query(coupleRef, where("partner2", "==", email));
  const querySnapshot2 = await getDocs(query2);
  if (!querySnapshot2.empty) {
    const data = querySnapshot2.docs[0].data();
    data["id"] = querySnapshot2.docs[0].id;
    return data;
  }
};

const incrementCuddles = (docId, couple, name) => {
  const coupleRef = collection(db, "couples");
  const docRef = doc(coupleRef, docId);
  updateDoc(docRef, {
    cuddles: increment(1),
  });
  couple.cuddles += 1;

  const fName = name.split(" ")[0];
  sendTextMessage(`${fName} wants a cuddle!`);

  return "cuddles", couple.cuddles;
};

const incrementMissYou = (docId, couple, name) => {
  const coupleRef = collection(db, "couples");
  const docRef = doc(coupleRef, docId);
  updateDoc(docRef, {
    missYou: increment(1),
  });
  couple.missYou += 1;

  const fName = name.split(" ")[0];
  let pronoun = "they";
  if (fName === "Olivia") {
    pronoun = "she";
  } else if (fName === "John") {
    pronoun = "he";
  }
  sendTextMessage(`${fName} is thinking about how much ${pronoun} misses you!`);

  return "missYou", couple.missYou;
};

const incrementGameScore = async (docId, game, player) => {
  const coupleRef = collection(db, "couples");
  const docRef = doc(coupleRef, docId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const gameData = docSnapshot.data()[game];
    const playerScore = gameData ? gameData[player] || 0 : 0;
    const updatedScore = playerScore + 1;
    updateDoc(docRef, {
      [`${game}.${player}`]: updatedScore,
    });
  }
};

const decrementGameScore = async (docId, game, player) => {
  const coupleRef = collection(db, "couples");
  const docRef = doc(coupleRef, docId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const gameData = docSnapshot.data()[game];
    const playerScore = gameData ? gameData[player] || 0 : 0;
    const updatedScore = playerScore - 1;
    updateDoc(docRef, {
      [`${game}.${player}`]: updatedScore,
    });
  }
};

const updateCoords = async (docId, key, latlng) => {
  const coupleRef = collection(db, "couples");
  const docRef = doc(coupleRef, docId);
  updateDoc(docRef, {
    [key]: {
      lat: latlng.lat,
      lng: latlng.lng,
    },
  });
};

const updateCity = async (docId, key, city, timezone) => {
  const coupleRef = collection(db, "couples");
  const docRef = doc(coupleRef, docId);
  updateDoc(docRef, {
    [key]: {
      city: city,
      timezone: timezone,
    },
  });
};

const updateMilesApart = async (docId, miles) => {
  const coupleRef = collection(db, "couples");
  const docRef = doc(coupleRef, docId);
  updateDoc(docRef, {
    milesApart: miles,
  });
};

const getSongInfo = async (docId, partner) => {
  const coupleRef = collection(db, "couples");
  const docRef = doc(coupleRef, docId);
  const songsRef = collection(docRef, "songs");
  const songRef = doc(songsRef, new Date().yyyymmdd());
  const data = await getDoc(songRef);
  if (data.exists() && data.data()[partner]) {
    return data.data();
  }
  return null;
};

const updateCurrentSong = async (docId, partner, song) => {
  const date = new Date().yyyymmdd();
  const songRef = doc(db, `couples/${docId}/songs`, date);
  const songSnapshot = await getDoc(songRef);
  if (songSnapshot.exists()) {
    updateDoc(songRef, {
      [partner]: song,
    });
  } else {
    setDoc(doc(db, `couples/${docId}/songs`, date), {
      [partner]: song,
    });
  }
};

const updateLicensePlate = async (docId, partner, state) => {
  const coupleRef = doc(db, `couples/${docId}`);
  updateDoc(coupleRef, {
    [`licensePlate.${partner}`]: arrayUnion(state),
  });
};

const removeLicensePlate = async (docId, partner, state) => {
  const coupleRef = doc(db, `couples/${docId}`);
  updateDoc(coupleRef, {
    [`licensePlate.${partner}`]: arrayRemove(state),
  });
};

const cleanState = async (docId) => {
  const coupleRef = doc(db, `couples/${docId}`);
  const coupleSnapshot = await getDoc(coupleRef);
  let player1Score = 0;
  let player2Score = 0;
  if (coupleSnapshot.exists()) {
    if (
      coupleSnapshot.data().flickMini.player1 >
      coupleSnapshot.data().flickMini.player2
    ) {
      player1Score += 1;
    } else if (
      coupleSnapshot.data().flickMini.player1 <
      coupleSnapshot.data().flickMini.player2
    ) {
      player2Score += 1;
    }

    if (
      coupleSnapshot.data().punchBuggy.player1 >
      coupleSnapshot.data().punchBuggy.player2
    ) {
      player1Score += 1;
    } else if (
      coupleSnapshot.data().punchBuggy.player1 <
      coupleSnapshot.data().punchBuggy.player2
    ) {
      player2Score += 1;
    }

    if (
      coupleSnapshot.data().licensePlate.player1.length >
      coupleSnapshot.data().licensePlate.player2.length
    ) {
      player1Score += 1;
    } else if (
      coupleSnapshot.data().licensePlate.player1.length <
      coupleSnapshot.data().licensePlate.player2.length
    ) {
      player2Score += 1;
    }
  }
  updateDoc(coupleRef, {
    flickMini: {
      player1: 0,
      player2: 0,
    },
    punchBuggy: {
      player1: 0,
      player2: 0,
    },
    missYou: 0,
    cuddles: 0,
    licensePlate: {
      player1: [],
      player2: [],
    },
    leaderboard: {
      player1: increment(player1Score),
      player2: increment(player2Score),
    },
  });
};

export {
  getCoupleDoc,
  incrementCuddles,
  incrementMissYou,
  incrementGameScore,
  decrementGameScore,
  updateCoords,
  updateCity,
  updateMilesApart,
  getSongInfo,
  updateCurrentSong,
  cleanState,
  updateLicensePlate,
  removeLicensePlate,
};
