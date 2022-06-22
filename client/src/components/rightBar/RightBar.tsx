import React, { useEffect, useState } from 'react'
import { Add, Cake, Close } from '@mui/icons-material'
import { Users } from '../../dummyData'
import ActiveUsers from './ActiveUsers'
import UserFriends from './UserFriends'
import { userProp } from '../interfaces/userProps'
import { followOrUnfollowUser, getCurrentUserData, getUserFriends } from '../../api/userAPI'
import LoadAnimation from '../load/LoadAnimation'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, setUserStatus } from '../../features/authSlice'


interface Props {
    user: userProp | undefined
}


const RightBar: React.FC<Props> = ({ user }) => {
    const [load, setLoad] = useState(false)
    // const [friends, setFriends] = useState<userFriendsProp>(null!)
    const [friends, setFriends] = useState([])
    const currentUser = useSelector(getUserData)
    const curr = currentUser.user
    const dispatch = useDispatch()
    const [following, setFollowing] = useState(false)

    const getFriends = async (userId: string) => {
        try {
            const res = await getUserFriends(userId)
            setFriends(res.data)
            setLoad(false)
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async () => {
        try {
            const res = await getCurrentUserData(curr.email)
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
            await followOrUnfollowUser(user._id, following, curr._id)
            setFollowing(!following)
            updateUser()
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
        if (!user) return
        setLoad(true)
        getFriends(user._id)
    }, [user])

    const HomeRightBar = () => {
        return (
            <>
                <div className='flex items-center mb-2 gap-2'>
                    <Cake className='text-blue-600' />
                    <h4 className='font-bold'>Birthdays</h4>
                </div>
                <div>
                    Harioo and three  others have their birthday
                </div>
                <hr className='mt-2 mb-2' />
                <div>
                    <div className='font-bold my-2'>
                        Online Friends
                    </div>
                    <div className='flex flex-col'>
                        {Users.map((user, index) => {
                            return (
                                <ActiveUsers
                                    key={index}
                                    username={user.username}
                                    profilePicture={user.profilePicture}
                                    id={user.id} />
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                <div className='p-3'>
                    <div className='font-bold'>
                        User Info
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

                {user?.email !== curr?.email &&
                    <div className='flex justify-center'>
                        <button
                            onClick={handleClick}
                            className={`flex items-center gap-1 ${!following ? "bg-blue-500 hover:bg-blue-700" : "bg-red-500 hover:bg-red-700"} text-white font-bold py-1 px-3 rounded`}>
                            {!following ? <div className='flex items-center'>Follow<Add /></div> : <div className='flex items-center'>UnFollow<Close /></div>}
                        </button>
                    </div>
                }

                <div className='font-bold p-3'>
                    Friends
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
            </>
        )
    }

    return (
        <div className={`h-full dark:bg-sideBar_dark_primary flex-grow overflow-y-auto scrollbar-hide bg-sideBar_light_primary dark:text-dark_Text text-black p-2 pt-4 ${user ? "rounded-lg" : ""}`}>
            <div>
                {
                    !user ?
                        <HomeRightBar /> :
                        <ProfileRightBar />
                }
            </div>
        </div>
    )
}

export default RightBar