import React from 'react'
import { BarLoader } from 'react-spinners'

const LoadingWIndow: React.FC = () => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black'>
            <div className='flex flex-col items-center justify-center gap-4 md:flex-row lg:flex-row mx-4 p-5 lg:p-20 lg:gap-20 rounded-lg  '>
                <div className='flex flex-col items-center justify-center gap-2'>
                    {/* <div className='font-bold text-3xl md:text-5xl lg:text-5xl'>OctoVerse</div> */}
                    {/* <span className='lg:text-2xl'>Connect with friends around the world</span> */}
                </div>
                {/* <div className='text-sm p-5 lg:w-1/2 md:w-1/2 font-semibold'>
                    As the server is hosted on a free Heroku account, the server enters ‘sleep mode’ when not in use for 60 minutes. If you notice an initial delay, please allow a few seconds for the servers to wake up
                </div> */}
                <div className='flex items-center'>
                    <BarLoader color="rgb(37 99 235)" />
                </div>
            </div>
        </div>
    )
}

export default LoadingWIndow