import { Done } from '@mui/icons-material'
import { Avatar, Tooltip, Zoom } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectTheme } from '../../../features/themeSlice'
import { LikeNotificationProps } from '../../interfaces/activityProps'
import moment from 'moment'
import { UPDATE_SEEN } from '../../../api/activityAPI'
import { userProp } from '../../interfaces/userProps'
import { GET_A_POST } from '../../../api/postAPI'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'

interface Prop {
    notification: LikeNotificationProps,
    user: userProp
}

const LikeNotification: React.FC<Prop> = ({ notification, user }) => {
    const themePreference = useSelector(selectTheme)
    const [seen, setSeen] = useState(notification.hasSeen)
    const hoverColour = !seen ? themePreference ? "#010409" : "#F6F8FA" : ""
    const [postType, setType] = useState("")
    // eslint-disable-next-line
    const [load, setLoad] = useState(false)
    const tok = Cookies.get('idToken')

    const handleClick = async () => {
        try {
            setSeen(true)
            await UPDATE_SEEN(notification._id, user.email)
        } catch (error) {
            console.log(error)
        }
    }

    const getPostType = async () => {
        try {
            const res = await GET_A_POST(notification.post.id)
            console.log(res.data)
            setType(res.data.type)
        } catch (error) {
            console.log(error)
        }
        setLoad(false)
    }

    // const getPostType ()   () =>{
    //     try {
    //         const res = await getaPost(user._id)
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     setLoad(false)
    // }

    useEffect(() => {
        if (!tok) return
        setLoad(true)
        getPostType()
        // eslint-disable-next-line
    }, [tok])

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
                            <span className='font-bold cursor-pointer hover:underline hover:text-blue-600'>
                                {notification.followerName}
                            </span>
                        </Link>
                        has liked your {postType === "video" ? "video" : "image" ? "image" : "post"}.
                        <div className='text-sm text-blue-600'>
                            {moment(notification.createdAt).fromNow()}
                        </div>
                    </div>
                    <div className='flex items-center gap-1'>
                        {
                            postType === "video" ?
                                <ReactPlayer
                                    width={100}
                                    height={50}
                                    url={notification.post.img}
                                />
                                :
                                notification.post.img !== "" &&
                                <img
                                    draggable="false"
                                    src={notification.post.img}
                                    alt=""
                                    className='h-10 rounded-lg' />
                        }
                        {
                            notification.post.img === "" &&
                            <div className={`overflow-y-auto scrollbar-hide ${themePreference ? "border-dark_Text" : "border-black"} p-1 rounded-lg`} style={{ width: "200px", height: "50px" }}>
                                {notification.post.desc}
                            </div>
                        }
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

export default LikeNotification