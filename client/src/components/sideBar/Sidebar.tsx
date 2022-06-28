import React, { useEffect, useState } from 'react'
import { RssFeed, Person } from '@mui/icons-material'
// import { Users } from '../../dummyData'
// import SideBarLists from './SideBarLists'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserData } from '../../features/authSlice'
import { getFriendSuggestions } from '../../api/userAPI'
import { userFriendsProp } from '../interfaces/userProps'
import LoadAnimation from '../load/LoadAnimation'
import UserFriends from '../rightBar/UserFriends'
import { newsProps } from '../interfaces/newsProps'
import { getNewsData } from '../../api/newsAPI'
import NewsBlock from './NewsBlock'


const Sidebar: React.FC = () => {
    const User = useSelector(getUserData)
    const currUser = User.user
    const [load, setLoad] = useState(false)
    const [news, setNews] = useState<newsProps>(null!)
    const listStyling = 'dark:list__cards__dark list__cards__light transition-all duration-200 ease-out my-1'

    const getNews = async () => {
        try {
            const res = await getNewsData()
            setNews(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoad(false)
    }

    useEffect(() => {
        setLoad(true)
        if (currUser?._id)
            getNews()
        // eslint-disable-next-line
    }, [currUser])

    return (
        <div className='h-full dark:bg-sideBar_dark_primary flex-grow overflow-y-auto scrollbar-hide bg-sideBar_light_primary dark:text-dark_Text text-black'>
            <div className='p-5'>
                <ul className='mb-2'>
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
                </ul>
                <hr className='bg-black' />
                <div className='flex items-center gap-1 mt-4 mb-2'>
                    <Person className='text-blue-600' />
                    <span className='font-bold'>Trending</span>
                </div>
                <div className='flex flex-wrap flex-col items-center justify-center gap-1'>
                    {!load && news ?
                        // @ts-ignore
                        news.map((news: newsProps, index: number) => {
                            return (
                                <NewsBlock
                                    news={news}
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