import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../../index.css";
import useOneTimeRefresh from "../../hooks/useOneTimeRefresh";

function Sucess() {
  // var hide = document.querySelector(".hide");
  // hide.style.display = "none";
  // localStorage.setItem("isHidden", "true");
  useOneTimeRefresh("successPageIdentifiers");

  const [userData, setUserData] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    async function getUsername() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/auth",
          {
            withCredentials: true,
          }
        );
        setUserData({
          firstName: response.data.User.firstName,
          lastname: response.data.User.lastName,
        });
        localStorage.setItem(
          "userData",
          JSON.stringify({
            firstName: response.data.User.firstName,
            lastName: response.data.User.lastName,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getUsername();
  }, []);

  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Navigate to="/changepassword" replace={true} />;
  }

  function changePassword() {
    setRedirect(true);
  }

  return (
    <div style={{ height: "350px", position: "relative", top: "50px" }}>
      <h1>Login in succesfull</h1>
      <h2>
        welcome {userData.firstName} {userData.lastname}
      </h2>
      <button onClick={changePassword} type="button" class="btn btn-secondary">
        Change Password
      </button>
    </div>
  );
}

export default Sucess;
