import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUserData } from "../features/authSlice";
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/login/Login";
import Register from "../pages/login/register/Register";
import ProfiePage from "../pages/profile/ProfiePage";

const SearchRoutes: React.FC = () => {
  const user = useSelector(getUserData)
  return <>
    <Routes>
      <Route path="/" element={user.user ? <HomePage /> : <Login />} />
      {!user.user &&
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      }
      <Route path="/profile/:username" element={<ProfiePage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  </>;
};

export default SearchRoutes;
