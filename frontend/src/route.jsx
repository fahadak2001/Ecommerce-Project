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
import axios from "axios";


const RoutesWrapper = ({ triggereffect }) => {


  const location = useLocation();


  const routes = (
    <Routes>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />
      <Route path="/login/done" element={<Sucess />} />
      <Route path="/" element={<GetProducts triggereffect={triggereffect} />} />
      <Route path="/getOrders" element={<GetAllOrders triggereffect={triggereffect} />} />
    </Routes>
  );

  if (location.pathname !== '/' && location.pathname !== '/getorders') {
    return (
      <div className="bg-gray-700" style={{ height: "450px", position: "relative", width: "450px", padding: "30px", margin: "auto", marginTop: "20px", marginBottom: "40px", borderRadius: "10%", color: "white" }}>
        {routes}
      </div>
    );
  }

  return routes;
};


const App = () => {

  const [count, setCount] = useState(0);

  const [trigger, setTrigger] = useState(0);

  const userDataString = localStorage.getItem("userData")
  const userData = JSON.parse(userDataString);
  const firstName = (userData.userData.firstName);
  const lastname = (userData.userData.lastname);

  async function getCount() {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/order/count", { withCredentials: true });
      setCount(response.data.count);
      console.log(response.data.count);
    } catch (error) {
      console.error("Error fetching order count:", error);
    }
  }

  useEffect(() => {
    getCount();
  }, [trigger]);


  function triggereffect() {
    setTrigger(prevTrigger => prevTrigger + 1);
  }


  return (
    <Router>
      <div>
        <nav className="bg-gray-800 fixed top-0 w-full z-10">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">My Eccommerce</span>
            </a>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <div style={{ color: "white" }}> {firstName}  {lastname}</div>
              <a href="/login" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Login</a>
              <a href="/register" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Register</a>
              <div style={{ color: "white" }}>
                <div style={{ color: "white" }}>{count}</div>
                <a href="/getorders"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="white" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2" /></svg></a>
              </div>
            </div>
          </div>
        </nav>
        <div style={{ position: "relative", top: "95px", bottom: "1000px" }}>
          <RoutesWrapper triggereffect={triggereffect} />
        </div>
      </div>
      <footer className="bg-gray-800 shadow dark:bg-gray-900 relative top-20 w-full p-2" >
        <div className="w-full max-w-screen-xl mx-auto md:py-4">
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MyEcommerce</span>
            <ul className="flex flex-wrap items-center mb-2 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Products</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">My Catalogue</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
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
