import React from 'react'
import { TopBar, SideBar, Feed, RightBar } from '../../components'

const ProfiePage: React.FC = () => {
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
                                    className='h-20 w-auto absolute mt-52 rounded border-2 border-transparent'
                                    src="https://avatars.dicebear.com/api/avataaars/hario.svg" />
                            </div>
                            <img
                                className='h-64 w-full object-fill rounded-lg'
                                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
                        </div>
                        <div>
                            <div className='font-bold text-2xl'>Hario</div>
                            <div className='font-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, deserunt.</div>
                        </div>
                    </div>
                    <div className='flex w-full h-screen'>
                        <Feed />
                        <div className='hidden mt-6 rounded-lg md:block lg:block w-1/3'>
                            <RightBar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfiePage