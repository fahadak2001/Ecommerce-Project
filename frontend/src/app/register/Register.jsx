import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';


function Register() {
    const [redirect, setRedirect] = useState(false);


    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [reTypedPassword, setRetypedPassword] = useState();


    function changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    function changeHandler0(e) {
        setRetypedPassword(e.target.value)
    }

    function passwordHandler(e) {
        e.preventDefault();
        if (reTypedPassword === user.password) {
            submitHandler();
        }
        else {
            toast.error("Passwords dont match")
        }
    }

    if (redirect) {
        return <Navigate to="/login/done" replace={true} />;
    }

    async function submitHandler(e) {
        console.log(user);
        await axios.post('http://localhost:5000/api/v1/user/register', user, { withCredentials: true }).then((response) => {
            console.log("response", response)
            toast.success("User registered successfully");
            setRedirect(true);
        })
            .catch((err) => {
                console.log("error", err);
                toast.error(err.response.data.mssg);
            });
    }

    return (
        <div style={{ height: "250px", position: "relative", top: "30px" }}>
            <form style={{ margin: "auto", width: 400 }} onSubmit={passwordHandler}>
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" name='firstName' placeholder="Enter your first name" onChange={(e) => changeHandler(e)} />
                </div>
                <div class="form-group">
                    <label>Last name</label>
                    <input type="text" class="form-control" name='lastName' placeholder="Enter your last name" onChange={(e) => changeHandler(e)} />
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" name='email' placeholder="johndoe@gmail.com" onChange={(e) => changeHandler(e)} />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" name='password' placeholder="type your new password" onChange={(e) => changeHandler(e)} />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" name='retypedpassword' placeholder="confirm your new password" onChange={(e) => changeHandler0(e)} />
                </div>
                <button type="submit" class="btn btn-primary" >Signup</button>
            </form>
        </div>
    );
}

export default Register;


