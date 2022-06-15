import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/login/Login";
import Register from "../pages/login/register/Register";
import ProfiePage from "../pages/profile/ProfiePage";

const SearchRoutes: React.FC = () => {
  return <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:username" element={<ProfiePage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  </>;
};

export default SearchRoutes;
