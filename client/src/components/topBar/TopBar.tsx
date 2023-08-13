import React, { useEffect, useState } from 'react'
import { Notifications, Lightbulb, NightlightRound } from '@mui/icons-material';
import { Badge, Tooltip, Zoom } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from '../../features/themeSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData, setUserStatus } from '../../features/authSlice';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import DropDown from '../dropdown/DropDown';
import SearchBar from './SearchBar';
import { GET_ACTIVITY, GET_ACTIVITY_COUNT } from '../../api/activityAPI';
import NotificationModal from '../modals/Notification/NotificationModal';
import { selectToken } from '../../features/tokenSlice';
import Cookies from 'js-cookie';

const TopBar: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const themePreference = useSelector(selectTheme)
    const user = useSelector(getUserData)
    const currUser = user.user
    const [load, setLoad] = useState(false)
    const [notif, setNotif] = useState([])
    const [newNotif, setNewNotif] = useState(0)
    const [open, setOpen] = useState(false)

    const changeTheme = () => {
        dispatch(setTheme({
            darkTheme: !themePreference
        }))
    }

    const logout = async () => {
        dispatch(setUserStatus({
            user: null,
            isFetching: false,
            error: { message: "" },
        }))
        Cookies.remove('idToken')
        await auth.signOut()
        navigate("/")
    }

    const getUserActivity = async () => {
        try {
            if (currUser?.email) {
                const res = await GET_ACTIVITY(currUser.email)
                setNotif(res.data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoad(false)
    }

    const getNotificationCount = async () => {
        try {
            if (currUser?.email) {
                const res = await GET_ACTIVITY_COUNT(currUser.email)
                setNewNotif(res.data.count)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!Cookies.get("idToken")) return
        setLoad(true)
        getNotificationCount()
        getUserActivity()
    }, [currUser])


    return (
        <>
            <div
                className='sticky flex flex-wrap items-center justify-between w-full h-auto p-2 mt-0 bg-navBar_BG text-navBar_Text '>
                {/* logo */}

                <div className='font-bold lg:text-2xl'>
                    <Link to="/">
                        <span className='cursor-pointer hover:text-blue-600'>OctoVerse</span>
                    </Link>
                </div>

                {/* center section */}
                <div className='hidden lg:block md:block'>
                    <SearchBar />
                </div>

                {/* Right section */}
                <div className='flex items-center gap-6 justify-evenly'>
                    <div className='flex items-center justify-center space-x-1'>

                        <Tooltip
                            onClick={() => setOpen(true)}
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title="Notifications">
                            <div className='cursor-pointer p-1.5 hover:bg-navbar_hover_highlight transition-all duration-300 ease-out rounded-lg'>
                                <Badge badgeContent={newNotif} color="success">
                                    <Notifications className='h-4' />
                                </Badge>
                            </div>
                        </Tooltip>

                        <Tooltip
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title={themePreference ? "Lightmode💡" : "DarkMode🌙"}>
                            <div className='cursor-pointer p-1.5 hover:bg-navbar_hover_highlight transition-all duration-300 ease-out rounded-lg' onClick={changeTheme}>
                                {themePreference ? <Lightbulb className='h-4' /> : <NightlightRound className='h-4' />}
                                {/* <Notifications className='h-5 color-black' /> */}
                            </div>
                        </Tooltip>

                        <DropDown
                            email={currUser?.email}
                            logOut={() => logout()}
                            userName={currUser?.userName ? currUser.userName : "Account"}
                            profileImage={currUser?.profilePicture === "" ? `https://avatars.dicebear.com/api/initials/${currUser?.userName}.svg` : currUser?.profilePicture}
                        />
                    </div>
                </div >
                <div className='flex justify-center p-2 lg:hidden md:hidden'>
                    <SearchBar />
                </div>
            </div >
            <NotificationModal
                open={open}
                notification={notif}
                handleClose={() => {
                    setOpen(false)
                    setLoad(true)
                    getNotificationCount()
                    getUserActivity()
                }}
            />
        </>
    )
}

export default TopBar