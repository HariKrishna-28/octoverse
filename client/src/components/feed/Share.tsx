import React from 'react'
import { PermMedia, Label, Room, EmojiEmotions, Shortcut } from "@mui/icons-material"
import { Tooltip, Zoom } from '@mui/material'
import { useSelector } from 'react-redux'
import { getUserData } from '../../features/authSlice'

const Share: React.FC = () => {
    const user = useSelector(getUserData)
    const currUser = user.user
    return (
        <div className='w-100 h-44 rounded-lg dark:bg-dark_feed_secondary shadow-lg bg-light_feed_secondary dark:text-navBar_Text text-black'>
            <div className='p-3'>
                <div className='flex items-center'>
                    <img
                        // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                        src={currUser?.profilePicture === "" ? `https://avatars.dicebear.com/api/initials/${currUser?.userName}.svg` : currUser?.profilePicture}
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
                        <div className='flex flex-wrap gap-2 items-center'>
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Photo/Video">
                                <div className='cursor-pointer p-1.5 hover:bg-red-600 transition-all duration-300 ease-out rounded-lg'>
                                    <PermMedia />
                                </div>
                            </Tooltip>
                            {/* <span>Photo or Video</span> */}
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Tag">
                                <div className='cursor-pointer p-1.5 hover:bg-blue-600 transition-all duration-300 ease-out rounded-lg'>
                                    <Label />
                                </div>
                            </Tooltip>

                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Location">
                                <div className='cursor-pointer p-1.5 hover:bg-purple-600 transition-all duration-300 ease-out rounded-lg'>
                                    <Room />
                                </div>
                            </Tooltip>

                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Feeling">
                                <div className='cursor-pointer p-1.5 hover:bg-yellow-600 transition-all duration-300 ease-out rounded-lg'>
                                    <EmojiEmotions />
                                </div>
                            </Tooltip>

                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Share">
                                <div className='cursor-pointer p-1.5 hover:bg-green-600 transition-all duration-300 ease-out rounded-lg'>
                                    <Shortcut />
                                </div>
                            </Tooltip>
                        </div>


                        {/* <div className='flex gap-2 items-center'>
                            <Room className='text-purple-600' />
                            <span>Location</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <EmojiEmotions className='text-yellow-600' />
                            <span>Feeling</span>
                        </div>
                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded'>Share</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share