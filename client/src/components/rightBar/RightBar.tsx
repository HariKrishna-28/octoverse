import React from 'react'
import { Cake } from '@mui/icons-material'
import { Badge } from '@mui/material'

const RightBar: React.FC = () => {
    const listStyling = 'dark:list__cards__dark list__cards__light transition-all duration-200 ease-out my-1'

    return (
        <div className='h-full dark:bg-sideBar_dark_primary flex-grow overflow-y-auto scrollbar-hide bg-sideBar_light_primary dark:text-dark_Text text-black p-2 pt-4'>
            <div>
                <div className='flex items-center mb-2 gap-2'>
                    {/* <img
                        // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                        src="https://mui.com/static/branding/companies/nasa-dark.svg"
                        alt="profile pic"
                        className='object-cover rounded-full cursor-pointer h-10'
                    /> */}
                    <Cake className='text-blue-600' />
                    <h4 className='font-bold'>Birthdays</h4>
                </div>
                <div>
                    Harioo and three  others have their birthday
                </div>
                <hr className='mt-2 mb-2' />
                <div>
                    <div className='font-bold my-2'>
                        Online Friends
                    </div>
                    <div className='flex flex-col'>
                        <div className={`${listStyling} flex gap-1 items-center`}>
                            <Badge overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <div className='bg-green-500 rounded-full p-1 border-2 dark:border-sideBar_dark_primary border-sideBar_light_primary' />
                                }>
                                <img src="https://mui.com/static/branding/companies/nasa-dark.svg" alt="user" className='object-cover rounded-full cursor-pointer h-6' />
                            </Badge>
                            <span>Name</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightBar