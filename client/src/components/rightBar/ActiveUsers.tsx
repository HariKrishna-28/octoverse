import React from 'react'
import { Badge } from '@mui/material'

interface Props {
    id: number,
    profilePicture: string,
    username: string,
}

const ActiveUsers: React.FC<Props> = ({ id, profilePicture, username }) => {
    const listStyling = 'dark:list__cards__dark list__cards__light transition-all duration-200 ease-out my-1'

    return (
        <div className={`${listStyling} flex gap-1 items-center`}>
            <Badge overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <div className='bg-green-500 rounded-full p-1 border-2 dark:border-sideBar_dark_primary border-sideBar_light_primary' />
                }>
                <img
                    src={profilePicture}
                    alt={username}
                    className='object-cover rounded-full cursor-pointer h-6' />
            </Badge>
            <span>{username}</span>
        </div>
    )
}

export default ActiveUsers