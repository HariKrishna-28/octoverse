import React, { useEffect, useState } from 'react'
import { ThumbUp } from '@mui/icons-material'
// import { Users } from '../../dummyData'
import { getUser } from '../../api/userAPI'
import moment from 'moment'
import { Link } from 'react-router-dom'
// import { postInterface } from '.././interfaces/postProps'
import { userProp } from '../interfaces/userProps'
import { likePosts } from '../../api/postAPI'
import { useSelector } from 'react-redux'
import { getUserData } from '../../features/authSlice'
import PostDropDown from '../dropdown/PostDropDown'
import PostDeleteModal from '../modals/PostDeleteModal'
import UpdatePostModal from '../modals/UpdatePostModal'
import { Verified } from '@mui/icons-material'

interface Props {
    post: {
        _id: string,
        userId: string,
        desc?: string,
        img?: string,
        likes: [],
        updatedAt: string,
        createdAt: string,
        // photo: string,
        // date: string,
        // comment: number,
    },
    triggerReload: () => void
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

const Post: React.FC<Props> = ({ post, triggerReload }) => {
    const [like, setLike] = useState<number>(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState<userProp>()
    // eslint-disable-next-line
    const [load, setLoad] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const userData = useSelector(getUserData)
    const currentUser: userProp = userData.user



    const handleLike = async () => {
        try {
            if (currentUser?._id) {
                const response = await likePosts(post._id, currentUser._id)
                console.log(response.data)
            }
            // if (currentUser?._id)  {
            //     const res = await likePosts(post._id, currentUser._id)
            // }
        } catch (error) {
            console.error(error)
        }

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

    useEffect(() => {
        if (currentUser?._id) {
            // @ts-ignore
            setIsLiked(post.likes.includes(currentUser._id))
        }
        // eslint-disable-next-line
    }, [currentUser])

    return (
        <>
            <div className='w-full dark:bg-dark_feed_secondary rounded-lg mt-3  shadow-lg bg-light_feed_secondary dark:text-navBar_Text text-black'>
                <div className='p-3'>
                    {/* top */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center w-full gap-1'>
                            <Link to={`profile/${user?.email}`}>
                                <img
                                    src={!user?.profilePicture ? `https://avatars.dicebear.com/api/initials/${user?.userName}.svg` : user?.profilePicture}
                                    alt="profile pic"
                                    className='object-cover rounded-full h-10'
                                    draggable="false" />
                            </Link>
                            <div className='flex w-full items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <span className='font-bold'>{user?.userName}</span>
                                    <div>
                                        {user?.isAdmin &&
                                            <div className='text-blue-600'>
                                                <Verified />
                                            </div>
                                        }
                                    </div>
                                </div>
                                {/* <span className='text-sm'>{format(post?.createdAt)}</span> */}
                            </div>
                        </div>
                        <div>
                            {currentUser?._id === post?.userId &&
                                <PostDropDown
                                    postId={post._id}
                                    userId={post.userId}
                                    handleDelete={() => setOpenDelete(true)}
                                    handleUpdate={() => setOpenUpdate(true)}
                                />}
                        </div>
                    </ div>
                    {/* center */}
                    <div>
                        {post?.img &&
                            <div className='flex justify-center mt-2 mb-2'>
                                <img
                                    // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                                    className='object-contain rounded-lg cursor-pointer max-h-64 '
                                    src={post?.img}
                                    alt="post"
                                    draggable="false"
                                />
                            </div>
                        }
                        <div className='p-2 mt-2'>{post?.desc}</div>
                    </div >
                    {/* bottom */}
                    <div className='flex items-center p-2 w-full justify-between'>
                        <div className='flex gap-3 items-center'>
                            {/* <Favorite className='cursor-pointer' /> */}
                            <ThumbUp
                                className={`cursor-pointer ${isLiked ? "text-blue-600" : ""}`}
                                onClick={handleLike} />
                            <span className='text-sm'>{like} likes</span>
                        </div>
                        <div>
                            <span className='text-sm'>{moment(post?.createdAt).fromNow()}</span>
                            {/* <span className='text-sm dark:hover:text-navbar_hover_highlight hover:text-blue-600'>{post.comment} comments</span> */}
                        </div>
                    </div >
                </div >
            </div >
            <PostDeleteModal
                postId={post._id}
                userId={post.userId}
                open={openDelete}
                handleClose={(flag) => {
                    setOpenDelete(false)
                    if (flag) triggerReload()
                }}
            />
            <UpdatePostModal
                postId={post._id}
                userId={post.userId}
                description={post?.desc ? post.desc : ""}
                imageUrl={post.img}
                open={openUpdate}
                handleClose={(flag) => {
                    setOpenUpdate(false)
                    if (flag) triggerReload()
                }}
            />
        </>
    )
}

export default Post