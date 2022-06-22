import { Tooltip, Zoom } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { userFriendsProp } from '../interfaces/userProps'
import { Link } from 'react-router-dom'

interface Props {
    user: userFriendsProp
}

const UserFriends: React.FC<Props> = ({ user }) => {
    const navigate = useNavigate()
    const tileStyling = 'dark:list__tiles__dark list__tiles__light transition-all duration-200 ease-out my-1'

    const handleClick = (email: string) => {
        navigate(`/profile/${email}`)
    }

    return (
        <Tooltip
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 400 }}
            title={user.userName}>
            {/* <Link to={`profile/${user.email}`}> */}
            <div
                onClick={() => handleClick(user.email)}
                className={`${tileStyling} items-center`}>
                <img
                    className='rounded-full h-12'
                    src={user.profilePicture}
                    alt={user.userName} />
            </div>
            {/* </Link> */}
        </Tooltip>
    )
}

export default UserFriends