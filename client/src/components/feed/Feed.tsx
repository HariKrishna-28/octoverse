import React from 'react'
import Post from './Post'
import Share from './Share'
import { Posts } from '../../dummyData'

const Feed: React.FC = () => {
    return (
        <div className='h-[calc(100vh-56px)] flex-grow overflow-y-auto scrollbar-hide dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black'>
            <div className='p-5'>
                <Share />
                {
                    Posts.map((post, index) => {
                        return (
                            <Post key={index} post={post} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Feed