import React, { useEffect, useState } from 'react'
import { getCurrentUserData } from '../../api/userAPI'
import { TopBar, SideBar, Feed, RightBar } from '../../components'
import { userProp } from '../../components/interfaces/userProps'
import { useParams } from 'react-router'
import { Verified } from '@mui/icons-material'
// import { useSelector } from 'react-redux'
// import { getUserData } from '../../features/authSlice'

const ProfiePage: React.FC = () => {
    const [user, setUser] = useState<userProp>()
    // const [load, setLoad] = useState(false)
    const params = useParams()

    useEffect(() => {
        async function getPostData() {
            try {
                // @ts-ignore
                const res = await getCurrentUserData(params.useremail)
                setUser(res.data)
                // console.log(res)
            } catch (error) {
                console.log(error)
            }
            // setLoad(false)
        }
        // setLoad(true)
        getPostData()
    }, [params.useremail])


    return (
        <div>
            <div>
                <TopBar />
            </div>
            {/* <div className='flex h-[calc(100vh-56px)] w-full '> */}
            <div className='flex h-100vh w-full '>
                <div
                    className='hidden md:block lg:block w-1/3'>
                    <SideBar />
                </div>
                <div className='flex flex-col w-full  dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black p-3'>
                    <div>
                        <div className='mt-2'>
                            <div className='flex items-center justify-end'>
                                <img
                                    alt=''
                                    className='h-20 w-auto absolute mt-52 rounded border-2 border-transparent'
                                    src={user?.profilePicture !== "" ? user?.profilePicture : `https://avatars.dicebear.com/api/initials/${user?.userName}.svg`} />
                            </div>
                            <img
                                className='h-64 w-full object-fill rounded-lg'
                                alt=''
                                src={user?.coverPicture === "" ? "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" : user?.coverPicture} />
                        </div>
                        <div>
                            <div className='flex items-center justify center'>
                                <div className='font-bold text-2xl'>{user?.userName}</div>
                                {user?.isAdmin &&
                                    <div className='text-blue-600'>
                                        <Verified />
                                    </div>
                                }
                            </div>
                            <div className='font-sm'>{user?.description}</div>
                        </div>
                    </div>
                    <div className='flex w-full h-screen'>
                        <Feed userName={user?.email} />
                        <div className='hidden mt-6 rounded-lg md:block lg:block w-1/3'>
                            <RightBar user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfiePage