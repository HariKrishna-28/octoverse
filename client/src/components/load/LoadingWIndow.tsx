import React from 'react'
import { BarLoader } from 'react-spinners'

const LoadingWIndow: React.FC = () => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black'>
            <div className='flex flex-col items-center justify-center md:flex-row lg:flex-row mx-4 p-5 lg:p-20 lg:gap-20 rounded-lg  '>
                <div className='flex items-center'>
                    <BarLoader color="rgb(37 99 235)" />
                </div>
            </div>
        </div>
    )
}

export default LoadingWIndow