import React, { useEffect, useState } from 'react'
import Post from './Post'
import Share from './Share'
import { Posts } from '../../dummyData'
import { GetTimelinePosts } from '../../api/postAPI'
import LoadAnimation from '../load/LoadAnimation'

const Feed: React.FC = () => {
    const [post, setPost] = useState([])
    const [load, setLoad] = useState(false)

    // useEffect(() => {
    //     async function getPostData() {
    //         try {
    //             const res = await GetTimelinePosts()
    //             setPost(res.data)
    //             console.log(post)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //         setLoad(false)
    //     }
    //     setLoad(true)
    //     getPostData()
    // }, [])

    return (
        <div className='h-[calc(100vh-56px)] flex-grow overflow-y-auto scrollbar-hide dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black'>
            <div className='p-5'>
                <Share />
                {
                    load
                        ?
                        <div className='p-10'>
                            <LoadAnimation />
                        </div>
                        :
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