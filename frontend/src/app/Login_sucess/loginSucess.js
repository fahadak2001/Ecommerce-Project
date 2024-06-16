import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Sucess() {
  const [userData, setUserData] = useState({ firstName: "", lastname: "" });

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
      } catch (error) {
        console.log(error);
      }
    }
    getUsername();
  }, []);

  localStorage.setItem("userData", JSON.stringify({ userData }));

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
