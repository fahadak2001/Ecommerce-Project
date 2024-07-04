import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../../index.css";
import useOneTimeRefresh from "../../hooks/useOneTimeRefresh";
import { format, parseISO } from "date-fns";

function Sucess() {
  useOneTimeRefresh("successPageIdentifiers");

  const [userData, setUserData] = useState({ firstName: "", lastName: "" });
  const [otherUserData, setOtherUserData] = useState({
    email: "",
    createdat: "",
  });
  const [mainRedirect, setMainRedirect] = useState(false);

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
          lastName: response.data.User.lastName,
        });
        setOtherUserData({
          email: response.data.User.email,
          createdat: response.data.User.createdAt,
        });
        localStorage.setItem(
          "userData",
          JSON.stringify({
            firstName: response.data.User.firstName,
            lastName: response.data.User.lastName,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getUsername();
  }, []);

  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Navigate to="/changepassword" replace={true} />;
  }

  function changePassword() {
    setRedirect(true);
  }

  let formattedDate = "Invalid Date";
  if (otherUserData.createdat) {
    try {
      const parsedDate = parseISO(otherUserData.createdat);
      formattedDate = format(parsedDate, "MMMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  }

  function mainredirectFunc() {
    setMainRedirect(true);
  }

  if (mainRedirect) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div class="container mx-auto my-5 p-5">
      <div class="md:flex no-wrap md:-mx-2 ">
        <div class="w-full md:w-3/12 md:mx-2">
          <div class="bg-white p-3 border-t-4 border-green-400">
            <div class="image overflow-hidden">
              <img
                class="h-auto w-full mx-auto"
                src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                alt=""
              />
            </div>
            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
              {userData.firstName} {userData.lastName}
            </h1>
            <h3 class="text-gray-600 font-lg text-semibold leading-6">
              lorem ipsum for now
            </h3>
            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
              non deserunt
            </p>
            <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li class="flex items-center py-3">
                <span>Status</span>
                <span class="ml-auto">
                  <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active
                  </span>
                </span>
              </li>
              <li class="flex items-center py-3">
                <span>Member since</span>
                <span class="ml-auto">{formattedDate}</span>
              </li>
            </ul>
          </div>
          <div class="my-4"></div>
        </div>

        <div class="w-full md:w-9/12 mx-2 h-64">
          <div class="bg-white p-3 shadow-sm rounded-sm">
            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span clas="text-green-500">
                <svg
                  class="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span class="tracking-wide">About</span>
            </div>
            <div class="text-gray-700">
              <div class="grid md:grid-cols-2 text-sm">
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">First Name</div>
                  <div class="px-4 py-2">{userData.firstName}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Last Name</div>
                  <div class="px-4 py-2">{userData.lastName}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Gender</div>
                  <div class="px-4 py-2">Male</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Contact No.</div>
                  <div class="px-4 py-2">NULL</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Current Address</div>
                  <div class="px-4 py-2">NULL</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Permanant Address</div>
                  <div class="px-4 py-2">NULL</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Email.</div>
                  <div class="px-4 py-2">
                    <a class="text-blue-800" href={otherUserData.email}>
                      {otherUserData.email}
                    </a>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Birthday</div>
                  <div class="px-4 py-2">NULL</div>
                </div>
              </div>
            </div>
            <button
              onClick={changePassword}
              class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
            >
              Change Password
            </button>
            <button
              onClick={mainredirectFunc}
              class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
            >
              Go Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sucess;
