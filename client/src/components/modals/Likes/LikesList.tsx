import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../features/themeSlice'

interface Props {
    id: string,
    profilePicture: string,
    username: string,
    email: string
}

const LikesList: React.FC<Props> = ({ id, profilePicture, username, email }) => {
    const themePreference = useSelector(selectTheme)
    // const listStyling = `${themePreference ? "list__cards__dark" : "list__cards__light"} transition-all duration-200 ease-out my-1`

    return (
        <>
            <div className={`flex flex-row gap-1 items-center p-3 ${themePreference ? "hover:bg-sideBar_dark_hover" : "hover:bg-sideBar_light_hover"} rounded-lg transition-all duration-200 ease-out my-1`}>
                <Avatar src={profilePicture} alt=""
                />
                <span>{username}</span>
            </div>
        </>
    )
}

export default LikesList