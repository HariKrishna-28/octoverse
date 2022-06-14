import React from 'react'
import { MoreVert, Favorite, ThumbUp } from '@mui/icons-material'

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
                <div >
                    <span>First post</span>
                    <div className='flex justify-center'>
                        <img
                            // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                            className='object-contain rounded-lg cursor-pointer max-h-64 '
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            alt="post"
                        />
                    </div>
                </div >
                {/* bottom */}
                <div className='flex items-center p-2 justify-between'>
                    <div className='flex gap-3 items-center'>
                        <Favorite className='cursor-pointer' />
                        <ThumbUp className='cursor-pointer' />
                        <span className='text-sm'>100 likes</span>
                    </div>
                    <div>
                        <span className='text-sm dark:hover:text-navbar_hover_highlight hover:text-blue-600'>10 comments</span>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default Post