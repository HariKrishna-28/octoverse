import React from 'react'
import LoadAnimation from './LoadAnimation'

const LoadingWIndow: React.FC = () => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black'>
            <div className='flex flex-col items-center justify-center gap-4 md:flex-row lg:flex-row mx-4 p-5 lg:p-20 lg:gap-20 rounded-lg  '>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='font-bold text-3xl md:text-5xl lg:text-7xl'>OctoVerse</div>
                    <span className='lg:text-2xl'>Connect with friends around the world</span>
                </div>
            </div>
            <div className='flex items-center'>
                <LoadAnimation />
            </div>
            <div className='text-sm'>
                Setting up your account
            </div>
        </div>
    )
}

export default LoadingWIndow