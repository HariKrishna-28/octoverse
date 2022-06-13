import React from 'react'
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"

const Share: React.FC = () => {
    return (
        <div className='w-100 h-44 rounded-lg dark:bg-dark_feed_secondary shadow-lg bg-light_feed_secondary dark:text-navBar_Text text-black'>
            <div className='p-3'>
                <div className='flex items-center'>
                    <img
                        // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                        src="https://mui.com/static/branding/companies/nasa-dark.svg"
                        alt="profile pic"
                        draggable="false"
                        className='object-cover rounded-full cursor-pointer w-12 h-12 mr-2'
                    />
                    <input
                        type="text"
                        placeholder="What's in your mind?"
                        className='w-full focus:outline-none rounded-md dark:bg-navBar_secondary text-black dark:text-navBar_Text p-1.5' />
                </div>
                <hr className='my-4' />
                <div className='mt-4'>
                    <div className='flex justify-evenly'>
                        <div className='flex gap-2 items-center'>
                            <PermMedia className='text-red-600' />
                            <span>Photo or Video</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Label className='text-blue-600' />
                            <span>Tag</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Room className='text-purple-600' />
                            <span>Location</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <EmojiEmotions className='text-yellow-600' />
                            <span>Feeling</span>
                        </div>
                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded'>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share