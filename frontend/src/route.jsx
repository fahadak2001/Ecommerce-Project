import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./app/register/Register";
import Login from "./app/login/login";
import ChangePassword from "./app/changePassword/changePassword";
import Forgotpassword from "./app/forgotPassword/forgotPassword";
import ResetPassword from "./app/resetpassword/Resetpassword";
import Sucess from "./app/Login_sucess/loginSucess";
import GetProducts from "./app/products/getProducts";
import GetAllOrders from "./app/order/getorder";
import LoginAdmin from "./app/Admin/adminLogin.jsx";
import AdminDasboard from "./app/Admin/adminDashboard.jsx";
import axios from "axios";
import ViewProduct from "./app/products/viewProduct";
import Home from "./Home.jsx";
import "./index.css";
import cookie from "js-cookie";
import ProtectedRoute from "./app/protectedRoute/ProtectedRoute.jsx";
import NotFound from "./app/404/404.js";
import AdminProtectedRoute from "./app/protectedRoute/adminProtectedRoute.jsx";
import User from "./app/Admin/adminDashboard/users.jsx"
import Product from "./app/Admin/adminDashboard/products.jsx"

const RoutesWrapper = ({ triggereffect }) => {


  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />

      <Route path="/shop" element={<GetProducts triggereffect={triggereffect} />} />
      <Route path="/getOrders" element={<GetAllOrders triggereffect={triggereffect} />} />
      <Route path="/products/specific/:productId" element={<ViewProduct triggereffect={triggereffect} />} />

      <Route path="/admin/login" element={<LoginAdmin />} />

      <Route path="/404" element={<NotFound />} />

      <Route
        path="/login/done"
        element={
          <ProtectedRoute>
            <Sucess />
          </ProtectedRoute>
        }
      />

      <Route path="/admin/login/sucess" element={<AdminProtectedRoute><AdminDasboard /></AdminProtectedRoute >} />

      <Route path="admin/login/sucess/users" element={<AdminProtectedRoute><AdminDasboard><User /></AdminDasboard></AdminProtectedRoute>} />

      <Route path="admin/login/sucess/products" element={<AdminProtectedRoute><AdminDasboard><Product /></AdminDasboard></AdminProtectedRoute>} />

    </Routes>
  );

  return routes;
};


const App = () => {

  function addremoveinfo() {
    if (localStorage.getItem('loginLinkHidden') === 'true') {
      document.querySelector('a[href="/login"]').classList.add('hide');
    }
    if (localStorage.getItem('loginLinkHidden') === 'false') {
      document.querySelector('a[href="/login"]').classList.remove('hide');
    }
    if (localStorage.getItem('registerLinkHidden') === 'true') {
      document.querySelector('a[href="/register"]').classList.add('hide');
    }
    if (localStorage.getItem('registerLinkHidden') === 'false') {
      document.querySelector('a[href="/register"]').classList.remove('hide');
    }
  };

  const [count, setCount] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function getCount() {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/order/count", { withCredentials: true });
      setCount(response.data.count);
    } catch (error) {
      console.error("Error fetching order count:", error);
    }
  }

  function setUserData() {
    const userDataKey = "userData";
    if (!localStorage.getItem(userDataKey)) {
      localStorage.setItem("userData", JSON.stringify({ firstName: "", lastName: "" }));
      const userDataString = localStorage.getItem("userData")
      const userData = JSON.parse(userDataString);
      setFirstName(userData.firstName);
      setLastName(userData.lastname);
    }
    else {
      const userDataString = localStorage.getItem("userData")
      const userData = JSON.parse(userDataString);
      setFirstName(userData.firstName);
      setLastName(userData.lastname);
    }
  }


  function triggereffect() {
    setTrigger(prevTrigger => prevTrigger + 1);
  }


  async function clearall() {
    const res = await axios.post("http://localhost:5000/api/v1/user/logout", { withCredentials: true });
    cookie.remove('token', { path: '/' });
    console.log(res);
    console.log("Token cookie cleared");
    localStorage.setItem("userData", JSON.stringify({ firstName: "", lastname: "" }));
    console.log("Local storage cleared");
    localStorage.setItem('loginLinkHidden', 'false');
    localStorage.setItem('registerLinkHidden', 'false');
    window.location.assign('/login');
  }

  useEffect(() => {
    setUserData(); getCount(); addremoveinfo();
  }, [trigger]);

  function getOrders() {
    if (count > 0) {
      window.location.assign('/getorders');
    }
    else {
      window.alert("login to view cart")
    }
  }

  return (
    <Router>

      <nav className="bg-white w-full ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-blue-950">My Eccommerce</span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div style={{ color: "white" }}> {firstName}  {lastName}</div>
            <a href="/login" className={` text-sm text-blue-950 dark:text-blue-950 hover:underline`}>Login</a>
            <a href="/register" className={` text-sm text-blue-950 dark:text-blue-950 hover:underline`}>Register</a>
            <button onClick={() => { clearall() }} className="text-sm text-blue-950 dark:text-blue-950 hover:underline">Logout</button>
            <div className="to-blue-950">
              <div className="to-blue-950">{count}</div>
              <a className="cursor-pointer" onClick={() => { getOrders() }}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="blue-950" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2" /></svg></a>
            </div>
          </div>
        </div>
      </nav>

      <div className="">
        <RoutesWrapper triggereffect={triggereffect} />
      </div>

      <footer className="bg-gray-600 shadow dark:bg-gray-900 relative top-20 w-full p-2" >
        <div className="w-full max-w-screen-xl mx-auto md:py-4">
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MyEcommerce</span>
            <ul className="flex flex-wrap items-center mb-2 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="/shop" className="hover:underline me-4 md:me-6">Products</a>
              </li>
              <li>
                <a href="/admin/login" className="hover:underline me-4 md:me-6">Admin Acess</a>
              </li>
              <li>
                <a href="fahad-asim2001@live.com" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
          <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Fahad Asim</a>. All Rights Reserved.</span>
        </div>
      </footer>
    </Router>
  );
};

export default App;
