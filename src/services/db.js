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
} from "firebase/firestore";

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

const incrementCuddles = (docId, couple) => {
  const coupleRef = collection(db, "couples");
  const docRef = doc(coupleRef, docId);
  updateDoc(docRef, {
    cuddles: increment(1),
  });
  couple.cuddles += 1;
  return "cuddles", couple.cuddles;
};

const incrementMissYou = (docId, couple) => {
  const coupleRef = collection(db, "couples");
  const docRef = doc(coupleRef, docId);
  updateDoc(docRef, {
    missYou: increment(1),
  });
  couple.missYou += 1;
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

export {
  getCoupleDoc,
  incrementCuddles,
  incrementMissYou,
  incrementGameScore,
  decrementGameScore,
  updateCoords,
  updateCity,
  updateMilesApart,
};
