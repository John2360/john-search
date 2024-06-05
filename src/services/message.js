import { auth } from "./firebase";
const sendTextMessage = async (text) => {
  const url = process.env.REACT_APP_TEXT;
  const idToken = await auth.currentUser.getIdToken();
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: text }),
  };

  try {
    const response = await fetch(url, requestOptions);
    return response.data;
  } catch (error) {
    console.log(`error sending text message: ${error}`);
    console.error(error);
    return null;
  }
};

export { sendTextMessage };
