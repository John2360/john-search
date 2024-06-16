import { encode } from "base-64";

const getAccessToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encode(
        process.env.REACT_APP_SPOTIFY_CLIENT_ID +
          ":" +
          process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
      )}`,
    },
    body: "grant_type=client_credentials",
  });

  return (await response.json()).access_token;
};

const searchSongs = async (query) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data.tracks.items;
};

export { searchSongs };
