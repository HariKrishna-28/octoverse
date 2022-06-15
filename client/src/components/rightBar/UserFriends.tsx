import { Tooltip, Zoom } from '@mui/material'
import React from 'react'

interface Props {
    id: number,
    profilePicture: string,
    username: string,
}

const UserFriends: React.FC<Props> = ({ id, profilePicture, username }) => {
    const tileStyling = 'dark:list__tiles__dark list__tiles__light transition-all duration-200 ease-out my-1'

    return (
        <Tooltip
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 400 }}
            title={username}>
            <div className={`${tileStyling} items-center`}>
                <img
                    className='rounded-full h-12'
                    src={profilePicture}
                    alt={username} />
            </div>
        </Tooltip>
    )
}

export default UserFriends