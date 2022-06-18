import React, { useEffect } from 'react'
import { TopBar, SideBar, Feed, RightBar } from '../../components'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserData } from '../../features/authSlice';

const HomePage: React.FC = () => {
    const userAuth = useSelector(getUserData)
    const navigate = useNavigate();

    useEffect(() => {
        !userAuth.user && navigate("/login")
    }, [])

    return (
        <>
            <div>
                <TopBar />
            </div>
            <div className='flex h-[calc(100vh-56px)] w-full '>
                <div
                    className='hidden md:block lg:block w-1/3'>
                    <SideBar />
                </div>
                <div className='w-full '>
                    <Feed userName={undefined} />
                </div>
                <div className='hidden md:block lg:block w-1/3'>
                    <RightBar user={undefined} />
                </div>
            </div>
        </>
    )
}

export default HomePage