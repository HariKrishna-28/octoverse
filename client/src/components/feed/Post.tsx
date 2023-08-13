import React, { useEffect, useState } from 'react'
import { ThumbUp } from '@mui/icons-material'
// import { Users } from '../../dummyData'
import { GET_USER } from '../../api/userAPI'
import moment from 'moment'
import { Link } from 'react-router-dom'
// import { postInterface } from '.././interfaces/postProps'
import { userProp } from '../interfaces/userProps'
import { LIKE_POSTS } from '../../api/postAPI'
import { useSelector } from 'react-redux'
import { getUserData } from '../../features/authSlice'
import PostDropDown from '../dropdown/PostDropDown'
import PostDeleteModal from '../modals/PostDeleteModal'
import UpdatePostModal from '../modals/UpdatePostModal'
import { Verified } from '@mui/icons-material'
import { CREATE_NEW_ACTIVITY } from '../../api/activityAPI'
import { Avatar } from '@mui/material'
import LikesModal from '../modals/Likes/LikesModal'
import ReactPlayer from 'react-player'


interface Props {
    post: {
        _id: string,
        userId: string,
        desc?: string,
        img?: string,
        likes: [],
        updatedAt: string,
        createdAt: string,
        userEmail: string,
        type: string
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
    const [user, setUser] = useState<userProp>()
    // eslint-disable-next-line
    const [load, setLoad] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [openLikes, setOpenLikes] = useState(false)
    const userData = useSelector(getUserData)
    const currentUser: userProp = userData.user
    // @ts-ignore
    const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser?._id));
    const [alreadyLiked, setAlreadyLiked] = useState(isLiked)


    const handleLike = async () => {
        try {
            if (currentUser?._id) {
                const res = await LIKE_POSTS(post._id, currentUser._id)
                console.log(res.data)
            }
        } catch (error) {
            console.error(error)
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
        if (isLiked) setAlreadyLiked(true)
        if (!isLiked && !alreadyLiked) {
            addActivity()
        }
    }

    const addActivity = async () => {
        try {
            const newActivity = {
                userEmail: post.userEmail,
                type: "like",
                followerId: currentUser._id,
                followerEmail: currentUser.email,
                profilePic: currentUser.profilePicture,
                hasSeen: false,
                post: {
                    img: post.img,
                    id: post._id,
                    desc: post.desc
                },
                followerName: currentUser.userName,
            }
            const res = await CREATE_NEW_ACTIVITY(newActivity)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getPostData() {
            try {
                const res = await GET_USER(post.userId, undefined)
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
            setLoad(false)
        }
        setLoad(true)
        getPostData()
        // eslint-disable-next-line
    }, [post.userId])


    // useEffect(() => {
    //     if (currentUser?._id) {
    //         // @ts-ignore
    //         setIsLiked(post.likes.includes(currentUser._id))
    //     }
    //     // eslint-disable-next-line
    // }, [currentUser, post.likes])


    return (
        <>
            <div className='w-full mt-3 text-black rounded-lg shadow-lg dark:bg-dark_feed_secondary bg-light_feed_secondary dark:text-navBar_Text'>
                <div className='p-3'>
                    {/* top */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center w-full gap-1'>
                            <Link to={`/profile/${user?.email}`}>
                                <Avatar
                                    src={!user?.profilePicture ? `https://avatars.dicebear.com/api/initials/${user?.userName}.svg` : user?.profilePicture}
                                    alt=""

                                />
                            </Link>
                            <div className='flex items-center justify-between w-full'>
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
                        {/* {post?.img &&
                            <div className='flex justify-center mt-2 mb-2'>
                                <img
                                    // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                                    className='object-contain rounded-lg cursor-pointer max-h-64 '
                                    src={post?.img}
                                    alt="post"
                                    draggable="false"
                                />
                            </div>
                        } */}
                        {post?.type === "image" ?
                            <div className='flex justify-center mt-2 mb-2'>
                                <img
                                    // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                                    className='object-contain rounded-lg cursor-pointer max-h-64 '
                                    src={post?.img}
                                    alt="post"
                                    draggable="false"
                                    loading='lazy'
                                />
                            </div>

                            : post?.type === "video" ?
                                <div className='flex justify-center mt-2 mb-2'>
                                    <ReactPlayer
                                        url={post?.img}
                                        loop
                                        controls
                                    />
                                </div>
                                : null
                        }
                        <div className='p-2 mt-2'>{post?.desc}</div>
                    </div >
                    {/* bottom */}
                    <div className='flex items-center justify-between w-full p-2'>
                        <div className='flex items-center gap-3'>
                            {/* <Favorite className='cursor-pointer' /> */}
                            <ThumbUp
                                className={`cursor-pointer ${isLiked ? "text-blue-600" : ""}`}
                                onClick={handleLike} />
                            <span className='text-sm cursor-pointer hover:underline' onClick={() => setOpenLikes(true)}>{like} likes</span>
                        </div>
                        <div>
                            <span className='text-sm text-blue-600'>{moment(post?.createdAt).fromNow()}</span>
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
            {openLikes && <LikesModal
                handleClose={() => setOpenLikes(false)}
                open={openLikes}
                postId={post._id}
            />}
        </>
    )
}

export default Post