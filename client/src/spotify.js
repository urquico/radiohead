export const authEndPoint = "https://accounts.spotify.com/authorize";

const redirectURI = "http://localhost:5173/";

const clientId = import.meta.env.VITE_CLIENT_ID;

const scopes = [
  "user-read-currently-playing",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-follow-read",
  "user-read-recently-played",
  "user-library-read",
];

export const loginURL = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const getTokenFromURL = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const getAccessToken = () => {
  let expires = 0 + localStorage.getItem("pa_expires");
  if (new Date().getTime() > expires) {
    // add logic here: delete all the contents of the local storage
    return "";
  }
  let token = localStorage.getItem("pa_token");
  return token;
};

export const setAccessToken = (token, expiresIn) => {
  localStorage.setItem("pa_token", token);
  localStorage.setItem("pa_expires", new Date().getTime() + expiresIn);
};

export const setUserDetails = (name, followers, id, image, type) => {
  localStorage.setItem("pa_username", name);
  localStorage.setItem("pa_followers", followers);
  localStorage.setItem("pa_id", id);
  localStorage.setItem("pa_photo", image);
  localStorage.setItem("pa_type", type);
};

export const logout = () => {
  localStorage.clear();
};
