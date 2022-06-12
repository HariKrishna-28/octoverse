import React, { useEffect } from 'react'
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Tooltip, Zoom } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/themeSlice';

const TopBar: React.FC = () => {
    const themePreference = useSelector(selectTheme)

    useEffect(() => {
        console.log(themePreference)
    }, [])

    return (
        <>
            <div>
                {/* logo */}
                <div>
                    <span>OctoVerse</span>
                </div>
                {/* center section */}
                <div>
                    <div>
                        <Tooltip
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 400 }}
                            title="Search">
                            <Search className='h-5 color-black' />
                        </Tooltip>
                        <input type="text" placeholder='search for friend, post or video' />
                    </div>
                </div>
                {/* Right section */}
                <div>
                    {/* Topbar links */}
                    <div>
                        <span>Homepage</span>
                        <span>Timeline</span>
                    </div>
                    <div>
                        <div>
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Person">
                                <Person className='h-5 color-black' />
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Chat">
                                <Chat className='h-5 color-black' />
                            </Tooltip>
                        </div>
                        <div>
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
                </div>
            </div>
        </>
    )
}

export default TopBar