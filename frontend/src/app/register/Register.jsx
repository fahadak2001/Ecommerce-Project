import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
const register = require("../../icons/register.png")


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
        localStorage.setItem('registerLinkHidden', 'true');
        window.location.assign('/login/done');
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

    return (<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                class="mx-auto h-10 w-auto"
                src={register}
                alt="Your Company"
            />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register Your Account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST" onSubmit={passwordHandler}>

                <div>
                    <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    <div class="mt-2">
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => changeHandler(e)}
                            placeholder="Enter your first name"
                        />
                    </div>
                </div>

                <div>
                    <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                    <div class="mt-2">
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => changeHandler(e)}
                            placeholder="Enter your last name"
                        />
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => changeHandler(e)}
                            placeholder="johndoe@gmail.com"
                        />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => changeHandler(e)}
                            placeholder="type your new password"
                        />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="retypedpassword" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                    </div>
                    <div class="mt-2">
                        <input
                            id="retypedpassword"
                            name="retypedpassword"
                            type="password"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => changeHandler0(e)}
                            placeholder="confirm your new password"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Signup
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500"></p>
        </div>
    </div>
    );
}

export default Register;


