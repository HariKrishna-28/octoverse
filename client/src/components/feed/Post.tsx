import React, { useEffect, useState } from 'react'
import { MoreVert, Favorite, ThumbUp } from '@mui/icons-material'
import { Users } from '../../dummyData'
import { getUser } from '../../api/userAPI'
import { format } from "timeago.js"
import { Link } from 'react-router-dom'
// import { postInterface } from '.././interfaces/postProps'
import { userProp } from '../interfaces/userProps'

interface Props {
    post: {
        _id: number,
        userId: string,
        desc?: string,
        img?: string,
        likes: [],
        updatedAt: string,
        createdAt: string,
        // photo: string,
        // date: string,
        // comment: number,
    }
}

// interface userProp {
//     _id: string,
//     userName: string,
//     email: string,
//     profilePicture: string,
//     coverPicture: string,
//     followers: [],
//     following: [],
//     isAdmin: boolean,
//     description: string,
//     city: string,
//     from: string,
//     createdAt: string,
//     // __v: number
// }

const Post: React.FC<Props> = ({ post }) => {
    const [like, setLike] = useState<number>(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState<userProp>()
    const [load, setLoad] = useState(false)


    const handleLike = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        async function getPostData() {
            try {
                const res = await getUser(post.userId, undefined)
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
            setLoad(false)
        }
        setLoad(true)
        getPostData()
    }, [post.userId])


    return (
        <div className='w-full dark:bg-dark_feed_secondary rounded-lg mt-3  shadow-lg bg-light_feed_secondary dark:text-navBar_Text text-black'>
            <div className='p-3'>
                {/* top */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <Link to={`profile/${user?.userName}`}>
                            <img
                                src={user?.profilePicture === "" ? `https://avatars.dicebear.com/api/initials/${user?.userName}.svg` : user?.profilePicture}
                                alt="profile pic"
                                className='object-cover rounded-full h-10'
                                draggable="false" />
                        </Link>
                        <span className='font-bold'>{user?.userName}</span>
                        <span className='text-sm'>{format(post?.createdAt)}</span>
                    </div>
                    <div>
                        <MoreVert />
                    </div>
                </ div>
                {/* center */}
                <div>
                    {post?.img &&
                        <div className='flex justify-center'>
                            <img
                                // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                                className='object-contain rounded-lg cursor-pointer max-h-64 '
                                src={post?.img}
                                alt="post"
                            />
                        </div>
                    }
                    <div className='p-2 mt-2'>{post?.desc}</div>
                </div >
                {/* bottom */}
                <div className='flex items-center p-2 justify-between'>
                    <div className='flex gap-3 items-center'>
                        <Favorite className='cursor-pointer' />
                        <ThumbUp
                            className={`cursor-pointer ${isLiked ? "text-blue-600" : ""}`}
                            onClick={handleLike} />
                        <span className='text-sm'>{like} likes</span>
                    </div>
                    <div>
                        {/* <span className='text-sm dark:hover:text-navbar_hover_highlight hover:text-blue-600'>{post.comment} comments</span> */}
                    </div>
                </div >
            </div >
        </div >
    )
}

export default Post