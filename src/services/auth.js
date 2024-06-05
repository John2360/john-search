import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getCoupleDoc } from "./db";

// Signin with Google
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

const getCoupleRef = async () => {
  const user = auth.currentUser;
  if (user) {
    const coupleRef = getCoupleDoc(user.email);
    if (coupleRef) {
      return coupleRef;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export { signInWithGoogle, getCoupleRef };
