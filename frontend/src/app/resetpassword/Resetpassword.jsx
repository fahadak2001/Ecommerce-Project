import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function ResetPassword() {
    const { token } = useParams();


    const [user, setUser] = useState({
        newPassword: "",
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
            .post(`http://localhost:5000/api/v1/user/reset/${token}`, user)
            .then((response) => {
                console.log("response", response);
                toast.success("password reset sucessfully");
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
                    <label>Change Password</label>
                    <input
                        type="password"
                        class="form-control"
                        name="newPassword"
                        placeholder="new password"
                        onChange={(e) => changeHandler(e)}
                    />
                </div>
                <button type="change" class="btn btn-primary">
                    reset password
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;
