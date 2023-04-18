import "./App.css";
import React, { useState } from "react";
import EmailGetting from "./Components/EmailGetting";
// import Home from "./Components/Home.js";
import Login from "./Components/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Blogs from "./Components/Blogs";
import Navbar from "./Components/Navbar";
// import Protected from "./Components/Protected";
import Users from "./Components/Users";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import Protected from "./Components/Protected";

import axios from "axios";
import ResetPassword from "./Components/ResetPassword";

function App() {
  const [status, setStatus] = useState();
  const [Role1, setRole] = useState(
    localStorage.getItem("isLoggedIn") === true
      ? JSON.parse(localStorage.getItem("Token").role)
      : ""
  );
  const [user, setuser] = useState(localStorage.getItem("isLoggedIn") === 'true' ? JSON.parse(localStorage.getItem("Token")) : "");
  const navigate = useNavigate();
  const statusMethod = (propsStatus, Role, user) => {
    setStatus(propsStatus);
    setRole(Role);
    setuser(user);
  };

  const logOut = () => {
    setStatus(false);
    navigate("/login");
    setRole("user");
    if ((user !== null) | (user !== undefined)) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/logout`, {
          withCredentials: true,
          headers : {'Authorization' :  `Bearer ${localStorage.getItem('jwt')}`}
        })
        .then((res) => {
          console.log(res);
        });
    }
    setuser({});
    localStorage.clear();
  };

  const isLoged = localStorage.getItem("isLoggedIn");

  // Interceptor
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('jwt')
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    response => {
      return response
    },
    function (error) {
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = localStorage.getItem('refreshToken')
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/token`, {refreshToken: refreshToken}).then(res => {
            if (res.status === 201) {
              console.log(res.data);
              localStorage.removeItem('jwt')
              localStorage.setItem('jwt',res.data)
              console.log(localStorage.getItem('jwt'));
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt')
              return axios(originalRequest)
            }
          })
      }
      return Promise.reject(error)
    }
  )
  // Interceptor

  //  console.log(JSON.parse(localStorage.getItem('Token')).Role);


  return (
    <div>
      <Navbar status={{ status, logOut, Role1, user, isLoged }} />
      <Routes>
        <Route path="/" element={<Home user={user}/>} />

        <Route path="/forgotPassword" element={<EmailGetting />} />

        <Route path= '/reset-password/:id/:token' element={<ResetPassword />} />

        <Route path="/login" element={<Login statusMethod={statusMethod} />} />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/blogs"
          element={
            <Blogs
              user={user}
              isLoggedIn={status}
              Role={Role1}
              isLoged={isLoged}
            />
          }
        />
        {/* <Route path="/users" element={<Users />} /> */}
        <Route
          path="/admin/"
          element={
            <Protected isLoggedIn={status} isLoged={isLoged}>
              <Admin />
            </Protected>
          }
        >
          <Route
            path="users"
            element={
              <Protected isLoggedIn={status} isLoged={isLoged}>
                <Users />
              </Protected>
            }
          />
          <Route
            path="blogs"
            element={
              <Protected isLoggedIn={status} isLoged={isLoged} >
                <Blogs isAdmin='admin' user={user} />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
// Done

// Firebase

// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if
//           request.time < timestamp.date(2023, 5, 17);
//     }
//   }
// }