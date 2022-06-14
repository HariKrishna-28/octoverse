import React from 'react'
import Post from './Post'
import Share from './Share'

const Feed: React.FC = () => {
    return (
        <div className='h-screen flex-grow overflow-y-auto scrollbar-hide dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black'>
            <div className='p-5'>
                <Share />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default Feed