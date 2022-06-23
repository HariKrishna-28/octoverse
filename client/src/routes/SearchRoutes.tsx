import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from 'react-router-dom'
import { getCurrentUserData } from "../api/userAPI";
import { userProp } from "../components/interfaces/userProps";
import LoadingWIndow from "../components/load/LoadingWIndow";
import { getUserData, setUserStatus } from "../features/authSlice";
import { auth } from "../firebase";
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/login/Login";
// import Register from "../pages/login/register/Register";
import ProfiePage from "../pages/profile/ProfiePage";

const SearchRoutes: React.FC = () => {
  const user = useSelector(getUserData)
  const dispatch = useDispatch()
  // @ts-ignore
  const [currentUser, loading] = useAuthState(auth)
  // const [primaryLoad, setPrimaryLoad] = useState(true)


  const getUserDtails = async (userEmail: string) => {
    try {
      const res = await getCurrentUserData(userEmail)
      // console.log(res.data)
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
    // console.log(user)
    // setPrimaryLoad(false)
  }

  useEffect(() => {
    if (loading) return
    // setPrimaryLoad(true)
    if (currentUser?.email) {
      getUserDtails(currentUser.email)
    }
    // eslint-disable-next-line
  }, [currentUser, loading])


  return <>
    {!loading ?
      <Routes>
        <Route path="/" element={!user.user && currentUser ? <Login /> : <HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:useremail" element={<ProfiePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      :
      <LoadingWIndow />
    }
  </>;
};

export default SearchRoutes;
