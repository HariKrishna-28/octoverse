import React from 'react'

interface Props {
    id: string,
    profilePicture: string,
    username: string,
    email: string
}

const SideBarLists: React.FC<Props> = ({ id, profilePicture, username, email }) => {
    const listStyling = 'dark:list__cards__dark list__cards__light transition-all duration-200 ease-out my-1'

    return (
        <div className={`${listStyling} flex items-center`}>
            <img src={profilePicture} alt={username} className='object-cover rounded-full cursor-pointer h-6' />
            <span>{username}</span>
        </div>
    )
}

export default SideBarLists