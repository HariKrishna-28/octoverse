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
    const listStyling = 'dark:list__cards__dark list__cards__light transition-all duration-200 ease-out my-1'

    return (
        <div>

            {/* <Avatar src={profilePicture} alt=""
            // className='object-cover rounded-full cursor-pointer h-6' 
            />
            <span>{username}</span> */}
        </div>
    )
}

export default LikesList