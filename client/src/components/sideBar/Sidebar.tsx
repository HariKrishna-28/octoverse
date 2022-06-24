import React, { useEffect, useState } from 'react'
import { RssFeed, Person } from '@mui/icons-material'
import { Users } from '../../dummyData'
import SideBarLists from './SideBarLists'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserData } from '../../features/authSlice'
import { getFriendSuggestions } from '../../api/userAPI'
import { userFriendsProp } from '../interfaces/userProps'
import LoadAnimation from '../load/LoadAnimation'
import UserFriends from '../rightBar/UserFriends'


const Sidebar: React.FC = () => {
    const User = useSelector(getUserData)
    const currUser = User.user
    const [load, setLoad] = useState(false)
    const [friends, setFriends] = useState<userFriendsProp>(null!)
    const listStyling = 'dark:list__cards__dark list__cards__light transition-all duration-200 ease-out my-1'

    const getFriend = async () => {
        try {
            const res = await getFriendSuggestions(currUser._id)
            setFriends(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoad(false)
    }

    useEffect(() => {
        setLoad(true)
        if (currUser?._id)
            getFriend()
    }, [User])

    return (
        <div className='h-full dark:bg-sideBar_dark_primary flex-grow overflow-y-auto scrollbar-hide bg-sideBar_light_primary dark:text-dark_Text text-black'>
            <div className='p-5'>
                <ul className='mb-2'>
                    {/* <div> */}
                    {/* <span className="font-bold text-sm">{currUser.userName}</span>
                    <span className="font-bold text-sm">{currUser.email}</span> */}
                    {/* </div> */}
                    <Link to="/">
                        <li className={`${listStyling} flex items-center`}>
                            <RssFeed />
                            <span>Feed</span>
                        </li>
                    </Link>
                    {
                        currUser?.email &&
                        <Link to={`/profile/${currUser?.email}`}>
                            <li className={`${listStyling} flex items-center`}>
                                <Person />
                                <span>Profile</span>
                            </li>
                        </Link>
                    }
                    {/* <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Videos</span>
                    </li>
                    <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Groups</span>
                    </li>
                    <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Bookmarks</span>
                    </li>
                    <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Questions</span>
                    </li>
                    <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Jobs</span>
                    </li> */}
                </ul>
                {/* <div className='text-center mb-2'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>show more</button>
                </div> */}
                <hr className='bg-black' />
                <div className='flex items-center gap-1 mt-4 mb-2'>
                    <Person className='text-blue-600' />
                    <span className='font-bold'>People you may know</span>
                </div>
                <div className='flex flex-wrap items-center justify-center gap-1'>
                    {!load && friends ?
                        // @ts-ignore
                        friends.map((user: userFriendsProp, index: number) => {
                            return (
                                <UserFriends
                                    user={user}
                                    key={index}
                                // email={user.email}
                                // username={user.userName}
                                // profilePicture={user.profilePicture}
                                // id={user._id} 
                                />
                            )
                        })
                        :
                        <LoadAnimation />
                    }
                </div>
            </div>
        </div >
    )
}

export default Sidebar