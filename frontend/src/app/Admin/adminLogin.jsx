import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
const login = require("../../icons/key.png")

const LoginAdmin = () => {


  const [redirect, setRedirect] = useState(false);
  const [redirectForget, setRedirectForget] = useState(false);

  const [admin, setAdmin] = useState({
    email: "",
    password: ""
  })

  async function checkAuth() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/admin/auth",
        { withCredentials: true }
      );
      console.log(response)
      setRedirect(true);
    } catch (error) {
      setRedirect(false);
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])


  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setAdmin({ ...admin, [name]: value })
  }


  if (redirect) {
    localStorage.setItem('loginLinkHidden', 'true');
    localStorage.setItem('registerLinkHidden', 'true');
    return <Navigate to="/admin/login/sucess" replace={true} />
  }

  if (redirectForget) {
    return <Navigate to="/forgotpassword" replace={true} />;
  }

  async function submitHandler(e) {
    e.preventDefault();
    console.log(admin);
    await axios.post('http://localhost:5000/api/v1/admin/login', admin, { withCredentials: true }).then((response) => {
      console.log("response", response)
      toast.success("Admin login sucessfull");
      setRedirect(true);
      localStorage.setItem("adminlogin", true)
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
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src={login} alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your Admin account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST" onSubmit={submitHandler}>
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => changeHandler(e)} />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => changeHandler(e)} />
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Sign in</button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
        </p>
      </div>
    </div>
  )
};

export default LoginAdmin;
