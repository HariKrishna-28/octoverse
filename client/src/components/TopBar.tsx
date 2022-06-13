import React, { useEffect } from 'react'
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Tooltip, Zoom } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from '../features/themeSlice';

const TopBar: React.FC = () => {
    const dispatch = useDispatch()
    const themePreference = useSelector(selectTheme)

    const changeTheme = () => {
        const data = {
            darkTheme: !themePreference
        }
        console.log(data)
        dispatch(setTheme(data))
    }

    useEffect(() => {
        console.log(themePreference)
    }, [themePreference])

    return (
        <>
            <div className='flex items-center flex-wrap justify-between mt-0 sticky bg-navBar_BG text-navBar_Text h-auto p-2 w-100 '>
                {/* logo */}
                <div className='font-bold lg:text-2xl'>
                    <span>OctoVerse</span>
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
                <div className='flex justify-evenly items-center gap-4 '>
                    {/* Topbar links */}
                    <div className='flex gap-2'>
                        <span>Homepage</span>
                        <span>Timeline</span>
                        <button
                            onClick={() => changeTheme()}
                            className="rounded">
                            {themePreference ? '💡' : '🌙'}
                        </button>
                    </div>
                    <div className='flex gap-2'>
                        <div className='cursor-pointer'>
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Person">
                                <Person className='h-5 color-black' />
                            </Tooltip>
                        </div>
                        <div className='cursor-pointer'>
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Chat">
                                <Chat className='h-5 color-black' />
                            </Tooltip>
                        </div>
                        <div className='cursor-pointer'>
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Notifications">
                                <Notifications className='h-5 color-black' />
                            </Tooltip>
                        </div>
                    </div>
                    {/* profile image */}
                    <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="profile pic" />
                </div >
            </div >
        </>
    )
}

export default TopBar