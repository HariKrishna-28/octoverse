import React, { useEffect, useState } from 'react'
import { GET_CURRENT_USER_DATA } from '../../api/userAPI'
import { TopBar, SideBar, Feed, RightBar } from '../../components'
import { userProp } from '../../components/interfaces/userProps'
import { useParams } from 'react-router'
import { Verified } from '@mui/icons-material'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { selectToken } from '../../features/tokenSlice'
// import { useSelector } from 'react-redux'
// import { getUserData } from '../../features/authSlice'

const ProfiePage: React.FC = () => {
    const [user, setUser] = useState<userProp>()
    const [load, setLoad] = useState(false)
    const params = useParams()

    async function getPostData() {
        try {
            // @ts-ignore
            const res = await GET_CURRENT_USER_DATA(params.useremail)
            setUser(res.data)
            // console.log(res)
        } catch (error) {
            console.log(error)
        }
        setLoad(false)
    }
    useEffect(() => {
        if (!Cookies.get("idToken")) return
        setLoad(true)
        getPostData()
    }, [params.useremail])


    return (
        <div>
            <div>
                <TopBar />
            </div>
            {/* <div className='flex h-[calc(100vh-56px)] w-full '> */}
            <div className='flex w-full h-100vh '>
                <div
                    className='hidden w-1/4 md:block lg:block'>
                    <SideBar />
                </div>
                <div className='flex flex-col w-full p-3 text-black dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text'>
                    <div>
                        <div className='mt-2'>
                            <div className='flex items-center justify-end'>
                                <img
                                    alt=''
                                    draggable='false'
                                    className='absolute w-auto h-20 border-2 border-transparent rounded mt-52'
                                    src={user?.profilePicture !== "" ? user?.profilePicture : `https://avatars.dicebear.com/api/initials/${user?.userName}.svg`} />
                            </div>
                            <img
                                alt=''
                                className='object-fill w-full h-64 rounded-lg'
                                draggable='false'
                                src={user?.coverPicture === "" ? "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" : user?.coverPicture} />
                        </div>
                        <div>
                            <div className='flex items-center justify center'>
                                <div className='text-2xl font-bold'>{user?.userName}</div>
                                {user?.isAdmin &&
                                    <div className='text-blue-600'>
                                        <Verified />
                                    </div>
                                }
                            </div>
                            <div className='font-sm'>{user?.description}</div>
                        </div>
                    </div>
                    <div className='flex flex-col-reverse lg:flex-row md:flex-row h-[calc(100vh-56px)] w-full '>
                        <Feed userName={user?.email} />
                        <div className='w-full mt-6 rounded-lg h-1/4 lg:h-full md:h-full lg:w-1/3 md:w-1/3 '>
                            <RightBar
                                triggerReload={() => {
                                    setLoad(true)
                                    getPostData()
                                }}
                                profile={true}
                                user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfiePage