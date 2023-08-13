import React, { useEffect, useState } from 'react'
import { Whatshot } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { getUserData } from '../../features/authSlice'
import LoadAnimation from '../load/LoadAnimation'
import { newsProps } from '../interfaces/newsProps'
import { GET_NEWS_DATA } from '../../api/newsAPI'
import NewsBlock from './NewsBlock'
import Cookies from 'js-cookie'


const Sidebar: React.FC = () => {
    const User = useSelector(getUserData)
    const currUser = User.user
    const [load, setLoad] = useState(false)
    // @ts-ignore
    const [news, setNews] = useState<newsProps>([])
    const [alreadyGot, setAlreadyGot] = useState(false)
    const listStyling = 'dark:list__cards__dark list__cards__light transition-all duration-200 ease-out my-1'

    const getNews = async () => {
        try {
            const res = await GET_NEWS_DATA()
            setNews(res.data)
            setLoad(false)
            setAlreadyGot(true)
        } catch (error) {
            setLoad(false)
            console.log(error)
        }
    }

    useEffect(() => {
        if (currUser?._id && Cookies.get('idToken')) {
            if (!alreadyGot) {
                setLoad(true)
                getNews()
            }
        }
        // eslint-disable-next-line
    }, [currUser])

    return (
        <div className='flex-grow h-full overflow-y-auto text-black dark:bg-sideBar_dark_primary scrollbar-hide bg-sideBar_light_primary dark:text-dark_Text'>
            <div className='p-5'>
                {/* <ul className='mb-2'>
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
                <hr className='bg-black' /> */}
                <div className='flex items-center gap-1 mb-2'>
                    <Whatshot className='text-red-600' />
                    <span className='font-bold'>Trending</span>
                </div>
                <div className='flex flex-col flex-wrap items-center justify-center gap-1'>
                    {!load && news ?
                        // @ts-ignore
                        news.map((news: newsProps, index: number) => {
                            return (
                                <NewsBlock
                                    key={index}
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