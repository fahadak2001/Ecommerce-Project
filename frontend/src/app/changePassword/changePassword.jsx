import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ChangePassword() {

    const [user, setUser] = useState({
        email: "",
        oldPassword: "",
        newPassword: ""
    })


    function changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }


    async function submitHandler(e) {
        console.log(user)
        e.preventDefault();
        console.log(user);
        await axios.post('http://localhost:5000/api/v1/user/change', user).then((response) => {
            console.log("response", response)
            toast.success("User password changed sucessfully");
        })
            .catch((err) => {
                console.log("error", err);
                toast.error(err.response.data.mssg);
            });
    }

    return (
        <div style={{ height: "350px", position: "relative", top: "50px" }}>
            <form style={{ margin: "auto", width: 400 }} onSubmit={submitHandler}>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" name='email' placeholder="johndoe@gmail.com" onChange={(e) => changeHandler(e)} />
                </div>
                <div class="form-group">
                    <label>old password</label>
                    <input type="password" class="form-control" name='oldPassword' placeholder="type your old password" onChange={(e) => changeHandler(e)} />
                </div>
                <div class="form-group">
                    <label>new password</label>
                    <input type="password" class="form-control" name='newPassword' placeholder="type your new password" onChange={(e) => changeHandler(e)} />
                </div>
                <button type="submit" class="btn btn-primary" >change</button>
            </form>
        </div>
    );
}

export default ChangePassword;


