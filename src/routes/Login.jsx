import { useEffect } from "react";
import { loginURL, getTokenFromURL, setAccessToken, setUserDetails } from "../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useNavigate } from "react-router-dom";

const spotify = new SpotifyWebApi();

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    let _spotifyToken = "";
    let _expiresIn = "";
    if (window.location.hash !== "") {
      _spotifyToken = getTokenFromURL().access_token;
      _expiresIn = getTokenFromURL().expires_in;
      spotify.setAccessToken(localStorage.getItem("pa_token"));
      setAccessToken(_spotifyToken, _expiresIn);
      spotify.setAccessToken(localStorage.getItem("pa_token"));

      spotify.getMe().then((user) => {
        setUserDetails(
          user.display_name,
          user.followers.total,
          user.id,
          user.images[0].url,
          user.type
        );
      });

      // window.location.hash = "";
      navigate("/profile");
    }
  }, [navigate]);

  return (
    <>
      <a href={loginURL} id="signInWithSpotify" className="spotifyButton">
        Sign in with spotify
      </a>
    </>
  );
}

export default Login;
