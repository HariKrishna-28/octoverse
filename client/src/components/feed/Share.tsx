import React, { useRef, useState, useEffect } from 'react'
import { PermMedia } from "@mui/icons-material"
import { Avatar, CircularProgress, Tooltip, Zoom } from '@mui/material'
import { useSelector } from 'react-redux'
import { getUserData } from '../../features/authSlice'
import { userProp } from '../interfaces/userProps'
import { UPLOAD_POST, VALIDATE_POST } from '../../api/postAPI'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase'
import LoadAnimation from '../load/LoadAnimation'
import { selectToken } from '../../features/tokenSlice'
import { messaging } from 'firebase-admin'
// import LoadAnimation from '../load/LoadAnimation'

interface Props {
    triggerReload: () => void
}

const Share: React.FC<Props> = ({ triggerReload }) => {
    // eslint-disable-next-line
    const [file, setFile] = useState<File | undefined>(undefined)
    const user = useSelector(getUserData)
    const currUser: userProp = user.user
    const desc = useRef<HTMLInputElement>(null)
    // eslint-disable-next-line
    const [error, setError] = useState("")
    const [upload, setUpload] = useState(false)
    const [imageURL, setImageURL] = useState("")
    // eslint-disable-next-line
    const [post, setPost] = useState(false)
    const [videoURL, setVideoURL] = useState("")
    const authToken = useSelector(selectToken)
    const [violations, setViolations] = useState([])

    const uploadImage = async (image: File) => {
        try {
            setUpload(true)
            const id = `images/${uuid().slice(0, 10)}`
            const imageRef = ref(storage, id)
            // @ts-ignore
            await uploadBytes(imageRef, image)
                .then(() => {
                    getDownloadURL(imageRef)
                        .then((url) => {
                            console.log(url)
                            setImageURL(url)
                        })
                }).catch(err => {
                    setError(err.message)
                    // console.log(err.message)
                })
        } catch (error) {
            console.error(error)
        }
        setUpload(false)
    }

    const uploadVideo = async (image: File) => {
        try {
            setUpload(true)
            const id = `videos/${uuid().slice(0, 10)}`
            const imageRef = ref(storage, id)
            // @ts-ignore
            await uploadBytes(imageRef, image)
                .then(() => {
                    getDownloadURL(imageRef)
                        .then((url) => {
                            console.log(url)
                            setVideoURL(url)
                        })
                }).catch(err => {
                    setError(err.message)
                    // console.log(err.message)
                })
        } catch (error) {
            console.error(error)
        }
        setUpload(false)
    }

    const uploadCurrentPost = async () => {
        const newPost = {
            userId: currUser._id,
            desc: desc?.current?.value ? desc.current.value : "",
            userEmail: currUser.email,
            img: imageURL !== "" ? imageURL : videoURL,
            type: imageURL !== "" ? "image" : videoURL !== "" ? "video" : "status"
        }
        try {
            console.log(violations)
            if (violations.length !== 0) {
                console.log("can't be posted")
            }
            else {
                console.log("yes")
            }
            // const res = await UPLOAD_POST(newPost, authToken)
            // console.log(res.data)
        } catch (error) {
            console.error(error)
        }
        cleanUp()
    }

    const cleanUp = () => {
        setImageURL("")
        if (desc?.current?.value)
            desc.current.value = ""
        triggerReload()
    }

    const validatePost = async (message: string) => {
        try {
            const res = await VALIDATE_POST(message, authToken)
            setViolations(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        setViolations([])
        e.preventDefault()
        // @ts-ignore
        if (desc.current.value === "" && imageURL === "") return
        setPost(true)
        if (desc.current?.value) {
            // const res = await VALIDATE_POST(desc.current.value, authToken)
            // setViolations(res.data)
            validatePost(desc.current.value)
        }
        uploadCurrentPost()
        setPost(false)
    }

    // useEffect(() => {
    //     if (violations.length === 0) return
    //     console.log(violations)
    // }, [violations])


    return (
        <>
            {user.user ?
                <div className='text-black rounded-lg shadow-lg w-100 h-44 dark:bg-dark_feed_secondary bg-light_feed_secondary dark:text-navBar_Text'>
                    <div className='p-3'>
                        <div className='flex items-center'
                        >
                            <Avatar
                                // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                                src={currUser?.profilePicture === "" ? `https://avatars.dicebear.com/api/initials/${currUser?.userName}.svg` : currUser?.profilePicture}
                                alt=""
                            // draggable="false"
                            // className='object-cover w-12 h-12 mr-2 rounded-full cursor-pointer'
                            />
                            <div className='flex justify-between w-full'>
                                <input
                                    ref={desc}
                                    onChange={() => {
                                        // if (desc.current?.value.length == 1)
                                        setViolations([])
                                    }}
                                    type="text"
                                    placeholder={"What's in your mind " + currUser?.userName + "?"}
                                    className='w-full focus:outline-none rounded-md dark:bg-navBar_secondary text-black dark:text-navBar_Text p-1.5' />
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    TransitionProps={{ timeout: 400 }}
                                    title="Photo/Video">
                                    <label
                                        htmlFor='image-upload'
                                        className='cursor-pointer p-1.5 hover:bg-red-600 transition-all duration-300 ease-out rounded-lg'>
                                        <PermMedia />
                                    </label>
                                </Tooltip>
                                <input
                                    // hidden input for image upload
                                    className='hidden'
                                    id='image-upload'
                                    type="file"
                                    onChange={(e) => {
                                        // @ts-ignore
                                        setFile(e.target?.files ? e.target.files[0] : undefined)
                                        // @ts-ignore
                                        const filee = e.target.files[0]
                                        if (filee !== undefined) {
                                            if (filee.size > 3000000) {
                                                alert("File can only be below 3 mb")
                                                setFile(undefined)
                                            }
                                            else {
                                                if (filee.type === "video/mp4") {
                                                    // @ts-ignore
                                                    uploadVideo(filee)
                                                } else {
                                                    // @ts-ignore
                                                    uploadImage(filee)
                                                }
                                            }
                                        }
                                    }}
                                    accept='.png, .jpeg, .jpg, .gif, .mp4' />
                            </div>
                        </div>
                        <hr className='my-4' />
                        <div className='mt-4'>
                            <div className='flex justify-evenly'>
                                <div className='flex flex-wrap items-center gap-2'>

                                    {
                                        !upload ?
                                            imageURL !== "" &&
                                            // <img src={imageURL} />
                                            <img src={imageURL} alt="" className='w-auto h-10' />
                                            :
                                            <>
                                                <CircularProgress />
                                            </>
                                    }


                                    {!upload ?
                                        <button
                                            onClick={(e) => handleSubmit(e)}
                                            className='px-3 py-1 font-bold text-white bg-green-500 rounded hover:bg-green-700'>
                                            {/* <Shortcut /> */}
                                            Post
                                        </button>
                                        :
                                        <div>
                                            Loading
                                        </div>
                                    }
                                    {/* </Tooltip> */}


                                </div>



                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='flex items-center justify-center w-100 h-44'>
                    <LoadAnimation />
                </div>
            }
        </>
    )
}

export default Share

