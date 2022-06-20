import React, { useEffect } from 'react'
import { Search, Person, Chat, Notifications, Lightbulb, NightlightRound, Logout } from '@mui/icons-material';
import { Tooltip, Zoom } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from '../../features/themeSlice';
import { Link } from 'react-router-dom';
import { getUserData, setUserStatus } from '../../features/authSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const TopBar: React.FC = () => {
    const dispatch = useDispatch()
    const themePreference = useSelector(selectTheme)
    const user = useSelector(getUserData)
    const currUser = user.user
    // @ts-ignore
    const [authUser, loading] = useAuthState(auth)


    const changeTheme = () => {
        dispatch(setTheme({
            darkTheme: !themePreference
        }))
    }

    const logout = () => {
        auth.signOut()
        const initialState = {
            user: null,
            isFetching: false,
            error: { message: "" },
        };
        dispatch(setUserStatus({
            user: null,
            isFetching: false,
            error: { message: "" },
        }))
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
                    <input
                        style={{ width: "350px" }}
                        type="text"
                        className='focus:outline-none rounded-md dark:bg-navBar_secondary text-black dark:text-navBar_Text p-1.5'
                        placeholder='search for friend, post or video' />
                    {/* <div className=' w-full'>
                        <Tooltip
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title="Search">
                            <Search className='h-5 color-black' />
                        </Tooltip>
                    </div> */}
                </div>

                {/* Right section */}
                <div className='flex justify-evenly items-center gap-6'>
                    {/* Topbar links */}
                    <div className='flex gap-2 mr-3'>
                        <span>Homepage</span>
                        <span>Timeline</span>
                        {/* <button
                            onClick={() => changeTheme()}
                            className="rounded">
                            {themePreference ? '💡' : '🌙'}
                        </button> */}
                    </div>
                    <div className='flex space-x-1'>
                        <Tooltip
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title="Person">
                            <div className='cursor-pointer p-1.5 hover:bg-navbar_hover_highlight transition-all duration-300 ease-out rounded-lg'>
                                <Person className='h-4' />
                            </div>
                        </Tooltip>

                        <Tooltip
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title="Chat">
                            <div className='cursor-pointer p-1.5 hover:bg-navbar_hover_highlight transition-all duration-300 ease-out rounded-lg'>
                                <Chat className='h-4' />
                            </div>
                        </Tooltip>

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

                        <Tooltip
                            onClick={logout}
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title="Logout">
                            <div className='cursor-pointer p-1.5 hover:bg-navbar_hover_highlight transition-all duration-300 ease-out rounded-lg'>
                                <Logout className='h-4' />
                            </div>
                        </Tooltip>
                    </div>

                    {/* profile image */}
                    <div >
                        <Tooltip
                            onClick={logout}
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title={currUser?.userName}>
                            <Link to={`profile/${currUser?.userName}`}>
                                <img
                                    // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                                    src={currUser?.profilePicture === "" ? `https://avatars.dicebear.com/api/initials/${currUser?.userName}.svg` : currUser?.profilePicture}
                                    alt="profile pic"
                                    className='object-cover rounded-full cursor-pointer h-10'
                                />
                            </Link>
                        </Tooltip>
                    </div>
                </div >
            </div >
        </>
    )
}

export default TopBar