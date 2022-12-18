import React, { useEffect, useState } from 'react'
import Post from './Post'
import Share from './Share'
// import { Posts } from '../../dummyData'
import { GET_TIMELINE_POSTS, GET_USER_PROFILE_POSTS } from '../../api/postAPI'
import LoadAnimation from '../load/LoadAnimation'
import { useSelector } from 'react-redux'
import { getUserData } from '../../features/authSlice'
import { selectToken } from '../../features/tokenSlice'

// interface userPosts {
//     createdAt: string,
//     desc?: string,
//     img?: string,
//     likes: [],
//     updatedAt: string,
//     userId: string,
//     __v: number,
//     _id: string,
// }

interface Props {
    userName: string | undefined
}

const Feed: React.FC<Props> = ({ userName = undefined }) => {
    const [post, setPost] = useState([])
    const [load, setLoad] = useState(false)
    const currUser = useSelector(getUserData)
    const authToken = useSelector(selectToken)

    async function getPostData() {
        // if (!currUser.user) {
        //     setLoad(false)
        //     return
        // }
        try {
            const res = !userName ? currUser.user?._id && await GET_TIMELINE_POSTS(currUser.user?._id, authToken) : await GET_USER_PROFILE_POSTS(userName, authToken)
            if (currUser.user?._id || userName)
                setPost(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoad(false)
    }

    useEffect(() => {
        if (!authToken) return
        setLoad(true)
        getPostData()
        // eslint-disable-next-line
    }, [userName, currUser, authToken])


    return (
        <div className='h-[calc(100vh-56px)] flex-grow overflow-y-auto scrollbar-hide dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black'>
            <div className='p-5'>
                {userName === undefined && <Share
                    triggerReload={() => {
                        setLoad(true)
                        getPostData()
                    }}
                />}
                {
                    load
                        ?
                        <div className='p-10'>
                            <LoadAnimation />
                        </div>
                        :
                        post.map((post, index) => {
                            return (
                                <Post
                                    key={index}
                                    post={post}
                                    triggerReload={() => {
                                        setLoad(true)
                                        getPostData()
                                    }}
                                />
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Feed