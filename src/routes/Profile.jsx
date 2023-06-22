import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, logout } from "../spotify";

function Profile() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [follower, setFollower] = useState(0);
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (getAccessToken() === "") {
      navigate("/");
    } else {
      const storedUsername = localStorage.getItem("pa_username");
      const storedFollower = localStorage.getItem("pa_followers");
      const storedPhoto = localStorage.getItem("pa_photo");

      setUsername(storedUsername);
      setFollower(storedFollower);
      setPhoto(storedPhoto);
      console.log(storedUsername, storedFollower, storedPhoto);

      setIsPageLoaded(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (username !== "" && username !== null) {
      const storedUsername = localStorage.getItem("pa_username");
      const storedFollower = localStorage.getItem("pa_followers");
      const storedPhoto = localStorage.getItem("pa_photo");

      setUsername(storedUsername);
      setFollower(storedFollower);
      setPhoto(storedPhoto);

      console.log(username);
    }
  }, [username]);

  const logoutUser = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      {!isPageLoaded ? (
        <>Add Loader Here</>
      ) : (
        <>
          {localStorage.getItem("pa_token") ? (
            <>
              <>{username}</>
              <>{follower}</>
              <img src={photo} alt="User Profile" />
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
