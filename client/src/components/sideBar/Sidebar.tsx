import React from 'react'
import { RssFeed, Chat } from '@mui/icons-material'


const Sidebar: React.FC = () => {

    const listStyling = 'dark:list__cards__dark list__cards__light transition-all duration-200 ease-out my-1'

    return (
        <div className='h-full dark:bg-sideBar_dark_primary flex-grow overflow-y-auto scrollbar-hide bg-sideBar_light_primary dark:text-dark_Text text-black'>
            <div className='p-5'>
                <ul className='mb-2'>
                    <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Feed</span>
                    </li>
                    <li className={`${listStyling} flex items-center`}>
                        <Chat />
                        <span>Chat</span>
                    </li>
                    <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Videos</span>
                    </li>
                    <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Groups</span>
                    </li>
                    <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Bookmarks</span>
                    </li>
                    <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Questions</span>
                    </li>
                    <li className={`${listStyling} flex items-center`}>
                        <RssFeed />
                        <span>Jobs</span>
                    </li>
                </ul>
                <div className='text-center mb-2'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>show more</button>
                </div>
                <hr className='bg-black' />
                <div className='flex flex-col mt-2'>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                    <div className={`${listStyling} flex items-center`}>
                        <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                        <span>Name of the</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar