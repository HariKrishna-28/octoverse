import React from 'react'
import { TopBar, SideBar, Feed, RightBar } from '../../components'

const HomePage: React.FC = () => {
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