import React, { useEffect, useState } from 'react'
import { TopBar, SideBar, Feed, RightBar } from '../../components'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserData } from '../../features/authSlice';
import { selectToken } from '../../features/tokenSlice';
import LoadAnimation from '../../components/load/LoadAnimation';
import LoadingWIndow from '../../components/load/LoadingWIndow';

const HomePage: React.FC = () => {
    const userAuth = useSelector(getUserData)
    const navigate = useNavigate();
    const authToken = useSelector(selectToken)
    const [load, setLoad] = useState(true)

    useEffect(() => {
        !userAuth.user && navigate("/")
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!authToken) return
        setLoad(false)
    }, [authToken, userAuth.user])

    return (
        <>
            {
                !load ?
                    <><div>
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
                    </> : <>
                        <LoadingWIndow /></>
            }
        </>
    )
}

export default HomePage