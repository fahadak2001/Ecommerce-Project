import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

function Login() {

    const api = axios.create({
        baseURL: 'http://localhost:5000/api/v1/user',
        withCredentials: true,
    });

    const [redirect, setRedirect] = useState(false);
    const [redirectForget, setRedirectForget] = useState(false);

    const [user, setUser] = useState({
        email: "",
        password: ""
    })


    function changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }


    if (redirect) {
        localStorage.setItem('loginLinkHidden', 'true');
        localStorage.setItem('registerLinkHidden', 'true');
        //return <Navigate to="/login/done" replace={true} />;
        window.location.assign('/login/done');
    }

    if (redirectForget) {
        return <Navigate to="/forgotpassword" replace={true} />;
    }

    async function submitHandler(e) {
        e.preventDefault();
        console.log(user);
        await api.post('/login', user).then((response) => {
            console.log("response", response)
            toast.success("User login sucessfull");
            setRedirect(true);
        })
            .catch((err) => {
                console.log("error", err);
                toast.error(err.response.data.msg);
            });
    }

    function callForget() {
        setRedirectForget(true);
    }

    return (
        <div style={{ height: "350px", position: "relative", top: "50px" }}>
            <form style={{ margin: "auto", width: 400 }} onSubmit={submitHandler}>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" name='email' placeholder="johndoe@gmail.com" onChange={(e) => changeHandler(e)} />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" name='password' placeholder="type your new password" onChange={(e) => changeHandler(e)} />
                </div>
                <button type="submit" class="btn btn-primary" >Login</button>
                <button onClick={callForget} type="button" class="btn btn-secondary" >Forgot Password</button>
            </form>
        </div >
    );
}

export default Login;


