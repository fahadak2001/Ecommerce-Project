import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Forgotpassword() {
  const [user, setUser] = useState({
    email: "",
  });

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  async function submitHandler(e) {
    console.log(user);
    e.preventDefault();
    console.log(user);
    await axios
      .post("http://localhost:5000/api/v1/user/forget", user)
      .then((response) => {
        console.log("response", response);
        toast.success("reset email send succesfully");
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err.response.data.message);
      });
  }

  return (
    <div style={{ height: "350px", position: "relative", top: "50px" }}>
      <form style={{ margin: "auto", width: 400 }} onSubmit={submitHandler}>
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          reset password
        </button>
      </form>
    </div>
  );
}

export default Forgotpassword;
