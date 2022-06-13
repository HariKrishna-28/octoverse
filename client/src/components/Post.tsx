import React from 'react'
import { MoreVert } from '@mui/icons-material'

const Post: React.FC = () => {
    return (
        <div className='w-full dark:bg-dark_feed_secondary rounded-lg mt-3  shadow-lg bg-light_feed_secondary dark:text-navBar_Text text-black'>
            <div className='p-3'>
                {/* top */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <img
                            // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                            src="https://mui.com/static/branding/companies/nasa-dark.svg"
                            alt="profile pic"
                            className='object-cover rounded-full cursor-pointer h-10'
                            draggable="false" />
                        <span className='font-bold'>Hario</span>
                        <span className='text-sm'>10 mins ago</span>
                    </div>
                    <div>
                        <MoreVert />
                    </div>
                </ div>
                {/* center */}
                <div>
                    <span>First post</span>
                    <img
                        // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                        className='object-cover rounded-lg cursor-pointer h-48'
                        src="https://yt3.ggpht.com/ytc/AKedOLQ2YdApvlnXWj5L1fVoKM-B3YGb2SuNc5LJkw7sGg=s48-c-k-c0x00ffffff-no-rj"
                        alt="profile pic"
                        draggable="false" />
                </div >
                {/* bottom */}
                <div>
                    <div></div>
                    <div></div>
                </div >
            </div >
        </div >
    )
}

export default Post