import React, { useEffect } from 'react'
import { TopBar, SideBar, Feed, RightBar } from '../../components'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserData } from '../../features/authSlice';
import { getToken } from '../../features/tokenSlice';

const HomePage: React.FC = () => {
    const userAuth = useSelector(getUserData)
    const navigate = useNavigate();
    const token = useSelector(getToken)

    useEffect(() => {
        !userAuth.user && navigate("/")
        // eslint-disable-next-line
    }, [])


    return (
        <>
            {
                token ?
                    <>
                        <div>
                            <TopBar />
                        </div>
                        <div className='flex flex-col lg:flex-row md:flex-row h-[calc(100vh-56px)] w-full '>
                            <div
                                className='w-full h-1/5 lg:h-full md:h-full lg:w-1/3 md:w-1/3'>
                                <SideBar />
                            </div>
                            <div className='w-full '>
                                <Feed userName={undefined} />
                            </div>
                            <div className='hidden md:block lg:block w-1/3'>
                                <RightBar
                                    profile={false}
                                    triggerReload={() => console.log("hi")}
                                    user={undefined} />
                            </div>
                        </div>
                    </>
                    :
                    <h1>loading</h1>
            }

        </>
    )
}

export default HomePage