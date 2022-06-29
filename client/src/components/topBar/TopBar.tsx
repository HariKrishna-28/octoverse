import React, { useState } from 'react'
import { Notifications, Lightbulb, NightlightRound } from '@mui/icons-material';
import { Tooltip, Zoom } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from '../../features/themeSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData, setUserStatus } from '../../features/authSlice';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import DropDown from '../dropdown/DropDown';
import SearchBar from './SearchBar';

const TopBar: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const themePreference = useSelector(selectTheme)
    const user = useSelector(getUserData)
    const currUser = user.user
    const [searchTerm, setSearchTerm] = useState("")

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
        await auth.signOut()
        navigate("/")
    }



    return (
        <>
            <div
                className='flex w-full sticky items-center flex-wrap justify-between mt-0 bg-navBar_BG text-navBar_Text h-auto p-2 '>
                {/* logo */}

                <div className='font-bold lg:text-2xl'>
                    <Link to="/">
                        <span className='hover:text-blue-600 cursor-pointer'>OctoVerse</span>
                    </Link>
                </div>

                {/* center section */}
                <div className='flex'>
                    <SearchBar />
                    {/* <input
                        onChange={(e) => handleInput(e)}
                        style={{ width: "350px" }}
                        type="text"
                        className='focus:outline-none rounded-md dark:bg-navBar_secondary text-black dark:text-navBar_Text p-1.5'
                        placeholder='search for friend, post or video' /> */}

                </div>

                {/* Right section */}
                <div className='flex justify-evenly items-center gap-6'>
                    <div className='flex space-x-1 items-center justify-center'>
                        {/* <Link to={`profile/${currUser?.userName}`}>
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Person">
                                <div className='cursor-pointer p-1.5 hover:bg-navbar_hover_highlight transition-all duration-300 ease-out rounded-lg'>
                                    <Person className='h-4' />
                                </div>
                            </Tooltip>
                        </Link> */}

                        {/* <Tooltip
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title="Chat">
                            <div className='cursor-pointer p-1.5 hover:bg-navbar_hover_highlight transition-all duration-300 ease-out rounded-lg'>
                                <Chat className='h-4' />
                            </div>
                        </Tooltip> */}

                        <Tooltip
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title="Notifications">
                            <div className='cursor-pointer p-1.5 hover:bg-navbar_hover_highlight transition-all duration-300 ease-out rounded-lg'>
                                <Notifications className='h-4' />
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
            </div >
        </>
    )
}

export default TopBar