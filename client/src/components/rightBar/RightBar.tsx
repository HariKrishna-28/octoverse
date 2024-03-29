import React, { useEffect, useState } from 'react'
import { Add, Close, Edit, Person, RssFeed } from '@mui/icons-material'
// import { Users } from '../../dummyData'
// import ActiveUsers from './ActiveUsers'
import UserFriends from './UserFriends'
import { userFriendsProp, userProp } from '../interfaces/userProps'
import { FOLLOW_OR_UNFOLLOW_USER, GET_CURRENT_USER_DATA, GET_FRIEND_SUGGESTIONS, GET_USER_FOLLOWING, GET_USER_FRIENDS } from '../../api/userAPI'
import LoadAnimation from '../load/LoadAnimation'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, setUserStatus } from '../../features/authSlice'
import UpdateProfileModal from '../modals/UpdateProfileModal'
import { Tooltip, Zoom } from '@mui/material'
import SideBarLists from '../sideBar/SideBarLists'
import { Link } from 'react-router-dom'
// import OnlineFriends from './OnlineFriends'
import { CREATE_NEW_ACTIVITY } from '../../api/activityAPI'
import Cookies from 'js-cookie'


interface Props {
    user: userProp | undefined,
    triggerReload: () => void,
    profile: boolean
}


const RightBar: React.FC<Props> = ({ user, triggerReload, profile = false }) => {
    const [load, setLoad] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    // const [friends, setFriends] = useState<userFriendsProp>(null!)
    const [friends, setFriends] = useState([])
    const currentUser = useSelector(getUserData)
    const curr = currentUser.user
    const [friendSuggestions, setFriendSuggestions] = useState<userFriendsProp>(null!)
    const dispatch = useDispatch()
    const [following, setFollowing] = useState(curr?.following?.includes(user?._id))
    const [alreadyFollowed, setAlreadyFollowed] = useState(following)
    const [userFollowing, setUserFollowing] = useState([])

    const getFriends = async (userId: string) => {
        try {
            const res = await GET_USER_FRIENDS(userId)
            setFriends(res.data)
            setLoad(false)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const getFollowing = async (userId: string) => {
        try {
            const res = await GET_USER_FOLLOWING(userId)
            setUserFollowing(res.data)

        } catch (error: any) {
            console.log(error.message)
        }
    }

    const updateUser = async () => {
        try {
            const res = await GET_CURRENT_USER_DATA(curr.email)
            dispatch(setUserStatus({
                user: res.data,
                isFetching: false,
                error: { message: "" },
            }))
            console.log(curr)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async () => {
        try {
            if (!user) return
            await FOLLOW_OR_UNFOLLOW_USER(user._id, following, curr._id)
            setFollowing(!following)
            if (following) setAlreadyFollowed(true)
            if (!following && !alreadyFollowed) createFollowActivity()
            updateUser()
        } catch (error) {
            console.log(error)
        }
    }



    const getUserFriendSuggestions = async (userId: string) => {
        try {
            const response = await GET_FRIEND_SUGGESTIONS(userId)
            setFriendSuggestions(response.data)
            setLoad(false)
        } catch (error) {
            setLoad(false)
            console.log(error)
        }
    }

    const createFollowActivity = async () => {
        try {
            const newActivity = {
                userEmail: user?.email,
                type: "follow",
                followerId: curr._id,
                followerEmail: curr.email,
                profilePic: curr.profilePicture,
                hasSeen: false,
                followerName: curr.userName
            }
            const res = await CREATE_NEW_ACTIVITY(newActivity)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (curr?.following) {
            setFollowing(curr.following.includes(user?._id))
        }
    }, [curr, user?._id])

    useEffect(() => {
        if (!Cookies.get('idToken')) return
        if (profile) {
            if (!user) return
            setLoad(true)
            getFollowing(user._id)
            getFriends(user._id)
        } else {
            if (!curr?._id) return
            setLoad(true)
            getUserFriendSuggestions(curr._id)
        }
    }, [user, profile, curr])

    const HomeRightBar = () => {
        const listStyling = 'dark:list__cards__dark list__cards__light transition-all duration-200 ease-out my-1'
        return (
            <>
                <div>
                    <ul className='mb-2'>
                        <Link to="/">
                            <li className={`${listStyling} flex items-center`}>
                                <RssFeed />
                                <span>Feed</span>
                            </li>
                        </Link>
                        {
                            curr?.email &&
                            <Link to={`/profile/${curr?.email}`}>
                                <li className={`${listStyling} flex items-center`}>
                                    <Person />
                                    <span>Profile</span>
                                </li>
                            </Link>
                        }
                    </ul>
                </div>
                <hr className='mt-2 mb-2' />
                <div className='flex items-center gap-2 mb-2'>
                    <Person className='text-blue-600' />
                    <h4 className='font-bold'>People you may know</h4>
                </div>
                <div>
                    {/* @ts-ignore */}
                    {!load ? friendSuggestions && friendSuggestions.map((friends: userFriendsProp, index: number) => {
                        return (
                            <div
                                key={index}
                            >
                                <Link to={`/profile/${friends.email}`}>
                                    <SideBarLists
                                        email={friends.email}
                                        id={friends._id}
                                        profilePicture={friends.profilePicture}
                                        username={friends.userName}
                                    />
                                </Link>
                            </div>
                        )
                    }) :
                        <LoadAnimation />
                    }
                </div>

                {/* <hr className='mt-2 mb-2' /> */}
                <div>
                    {/* <div className='my-2 font-bold'>
                        Online Friends
                    </div>
                    <OnlineFriends /> */}
                    {/* <div className='flex flex-col'>
                        {Users.map((user, index) => {
                            return (
                                <ActiveUsers
                                    key={index}
                                    username={user.username}
                                    profilePicture={user.profilePicture}
                                    id={user.id} />
                            )
                        })}
                    </div> */}
                </div>
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                <div className='p-3'>
                    <div className='flex items-center justify-between'>
                        <div className='font-bold'>
                            User Info
                        </div>
                        {user?.email === curr.email &&

                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Edit Profile">
                                <div
                                    className='cursor-pointer p-1.5 dark:hover:bg-navBar_BG hover:bg-light_feed_primary transition-all duration-300 ease-out rounded-lg'
                                    onClick={() => setOpenEdit(true)}>
                                    <Edit />
                                </div>
                            </Tooltip>}
                    </div>
                    <div>
                        <div>
                            <span className='font-semibold'>City : </span>
                            <span>{user?.city}</span>
                        </div>
                        <div>
                            <span className='font-semibold'>From : </span>
                            <span>{user?.from}</span>
                        </div>
                    </div>
                </div>

                {
                    user?.email !== curr?.email &&
                    <div className='flex justify-center'>
                        <button
                            onClick={handleClick}
                            className={`flex items-center gap-1 ${!following ? "bg-blue-500 hover:bg-blue-700" : "bg-red-500 hover:bg-red-700"} text-white font-bold py-1 px-3 rounded`}>
                            {!following ? <div className='flex items-center'>Follow<Add /></div> : <div className='flex items-center'>UnFollow<Close /></div>}
                        </button>
                    </div>
                }

                <div className='p-3 font-bold'>
                    Followers
                </div>
                <div>
                    <div className='flex flex-wrap items-center justify-center gap-1'>
                        {
                            !load ?
                                friends.map((user, index) => {
                                    return (
                                        <div key={index}>
                                            <UserFriends
                                                user={user}
                                            />
                                        </div>
                                    )
                                })
                                :
                                <LoadAnimation />
                        }
                    </div>
                </div>
                <div className='p-3 font-bold'>
                    Following
                </div>
                <div>
                    <div className='flex flex-wrap items-center justify-center gap-1'>
                        {
                            !load ?
                                userFollowing.map((user, index) => {
                                    return (
                                        <div key={index}>
                                            <UserFriends
                                                user={user}
                                            />
                                        </div>
                                    )
                                })
                                :
                                <LoadAnimation />
                        }
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={`h-full dark:bg-sideBar_dark_primary flex-grow overflow-y-auto scrollbar-hide bg-sideBar_light_primary dark:text-dark_Text text-black p-2 pt-4 ${user ? "rounded-lg" : ""}`}>
                <div>
                    {
                        !user ?
                            <HomeRightBar /> :
                            <ProfileRightBar />
                    }
                </div>
            </div>

            <UpdateProfileModal
                open={openEdit}
                user={curr}
                handleClose={(flag) => {
                    setOpenEdit(false)
                    if (flag) {
                        if (!user) return
                        triggerReload()
                        // setLoad(true)
                        // getFriends(user._id)
                    }
                }}
            />
        </>
    )
}

export default RightBar