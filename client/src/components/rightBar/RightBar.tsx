import React from 'react'
import { Cake } from '@mui/icons-material'
import { Users } from '../../dummyData'
import ActiveUsers from './ActiveUsers'


const RightBar: React.FC = () => {

    return (
        <div className='h-full dark:bg-sideBar_dark_primary flex-grow overflow-y-auto scrollbar-hide bg-sideBar_light_primary dark:text-dark_Text text-black p-2 pt-4'>
            <div>
                <div className='flex items-center mb-2 gap-2'>
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
                        {Users.map((user, index) => {
                            return (
                                <ActiveUsers
                                    key={index}
                                    username={user.username}
                                    profilePicture={user.profilePicture}
                                    id={user.id} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightBar