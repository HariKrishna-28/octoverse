import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from 'react-router-dom'
import { GET_CURRENT_USER_DATA } from "../api/userAPI";
import { userProp } from "../components/interfaces/userProps";
import LoadingWIndow from "../components/load/LoadingWIndow";
import { getUserData, setUserStatus } from "../features/authSlice";
import { selectToken, setAuthToken } from "../features/tokenSlice";
import { auth } from "../firebase";
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/login/Login";
// import Register from "../pages/login/register/Register";
import ProfiePage from "../pages/profile/ProfiePage";
import Cookies from 'js-cookie';

const SearchRoutes: React.FC = () => {
  const user = useSelector(getUserData)
  const dispatch = useDispatch()
  // @ts-ignore
  const [currentUser, loading] = useAuthState(auth)

  const getUserDtails = async (userEmail: string) => {
    try {
      const res = await GET_CURRENT_USER_DATA(userEmail)
      updateUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser = async (userData: userProp) => {
    dispatch(setUserStatus({
      user: userData,
      isFetching: false,
      error: { message: "" },
    }))
  }

  useEffect(() => {
    if (loading) return
    if (currentUser?.email) {
      const authToken = Cookies.get('idToken')
      authToken &&
        getUserDtails(currentUser.email)
    }
    // eslint-disable-next-line
  }, [currentUser, loading])

  useEffect(() => {
    auth.onIdTokenChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken()
        Cookies.set('idToken', idToken);
      } else {
        Cookies.remove('idToken');
      }
    })
  }, [])


  return <>
    {!loading ?
      <Routes>
        <Route path="/" element={!user.user && !currentUser ? <Navigate replace to="/login" /> : <HomePage />} />
        {!user.user && !currentUser &&
          <Route path="/login" element={<Login />} />
        }
        {currentUser && user.user && <Route path="/profile/:useremail" element={<ProfiePage />} />}
        {/* {currentUser && user.user && <Route path="/:searchQuery" element={<ProfiePage />} />} */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      :
      <LoadingWIndow />
    }
  </>;
};

export default SearchRoutes;
