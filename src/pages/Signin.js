import React from "react";
import { signInWithGoogle } from "../services/auth";

function Signin() {
  return (
    <div>
      <div className="divider"></div>
      <p>
        Hi Olivia! Sign in with your Gmail account to get started. - &#60;3 John
      </p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default Signin;
