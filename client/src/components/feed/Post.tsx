import React, { useEffect, useState } from 'react'
import { MoreVert, Favorite, ThumbUp } from '@mui/icons-material'
import { Users } from '../../dummyData'
import { GetUser } from '../../api/userAPI'

interface Props {
    post: {
        id: number,
        photo: string,
        date: string,
        userId: number,
        like: number,
        comment: number,
        desc?: string,
    }
}

const Post: React.FC<Props> = ({ post }) => {
    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const [load, setLoad] = useState(false)


    const handleLike = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        async function getPostData() {
            try {
                const res = await GetUser(post.userId)
                setUser(res.data)
                console.log(user)
            } catch (error) {
                console.log(error)
            }
            setLoad(false)
        }
        setLoad(true)
        getPostData()
    }, [post])

    return (
        <div className='w-full dark:bg-dark_feed_secondary rounded-lg mt-3  shadow-lg bg-light_feed_secondary dark:text-navBar_Text text-black'>
            <div className='p-3'>
                {/* top */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <img
                            src={Users.filter((u) => u.id === post.userId)[0].profilePicture}
                            alt="profile pic"
                            className='object-cover rounded-full h-10'
                            draggable="false" />
                        <span className='font-bold'>{Users.filter((u) => u.id === post.userId)[0].username}</span>
                        <span className='text-sm'>{post.date}</span>
                    </div>
                    <div>
                        <MoreVert />
                    </div>
                </ div>
                {/* center */}
                <div>
                    <div className='flex justify-center'>
                        <img
                            // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                            className='object-contain rounded-lg cursor-pointer max-h-64 '
                            src={post.photo}
                            alt="post"
                        />
                    </div>
                    <span className='p-2'>{post?.desc}</span>
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
                        <span className='text-sm dark:hover:text-navbar_hover_highlight hover:text-blue-600'>{post.comment} comments</span>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default Post