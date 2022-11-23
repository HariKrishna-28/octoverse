import { Done } from '@mui/icons-material'
import { Avatar, Tooltip, Zoom } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectTheme } from '../../../features/themeSlice'
import { FollowNotificationProps } from '../../interfaces/activityProps'
import moment from 'moment'
import { updateSeen, UPDATE_SEEN } from '../../../api/activityAPI'
import { userProp } from '../../interfaces/userProps'
import { selectToken } from '../../../features/tokenSlice'

interface Prop {
    notification: FollowNotificationProps,
    user: userProp
}

const FollowNotification: React.FC<Prop> = ({ notification, user }) => {
    const themePreference = useSelector(selectTheme)
    const [seen, setSeen] = useState(notification.hasSeen)
    const authToken = useSelector(selectToken)
    const hoverColour = !seen ? themePreference ? "#010409" : "#F6F8FA" : ""

    const handleClick = async () => {
        try {
            setSeen(true)
            await UPDATE_SEEN(notification._id, user.email, authToken)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div
                style={{
                    backgroundColor: hoverColour
                }}
                className={`p-2 rounded-lg`}
            >
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <Avatar alt="" src={notification.profilePic} />
                        <Link to={`/profile/${notification.followerEmail}`}>
                            <span className='font-bold hover:underline hover:text-blue-600 cursor-pointer'>
                                {notification.followerName}
                            </span>
                        </Link>
                        started following you.
                        <div className='text-sm text-blue-600'>
                            {moment(notification.createdAt).fromNow()}
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        {!seen &&
                            <Tooltip
                                onClick={() => handleClick()}
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Mark as seen">
                                <button
                                    className={`cursor-pointer p-1.5  ${!themePreference ? "hover:bg-light_feed_secondary text-black" : "hover:bg-navBar_BG text-navBar_Text"} transition-all duration-300 ease-out rounded-lg`}>
                                    <Done className='h-4' />
                                </button>
                            </Tooltip>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FollowNotification