import React, { useRef, useState } from 'react'
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { Tooltip, Zoom } from '@mui/material'
import { useSelector } from 'react-redux'
import { getUserData } from '../../features/authSlice'
import { userProp } from '../interfaces/userProps'
import { uploadPost } from '../../api/postAPI'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase'
import LoadAnimation from '../load/LoadAnimation'

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

    const uploadCurrentPost = async () => {
        const newPost = {
            userId: currUser._id,
            desc: desc?.current?.value ? desc.current.value : "",
            userEmail: currUser.email,
            img: imageURL,
        }
        try {
            const res = await uploadPost(newPost)
            console.log(res.data)
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

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        // @ts-ignore
        if (desc.current.value === "" && imageURL === "") return
        setPost(true)
        uploadCurrentPost()
        setPost(false)
    }


    return (
        <div className='w-100 h-44 rounded-lg dark:bg-dark_feed_secondary shadow-lg bg-light_feed_secondary dark:text-navBar_Text text-black'>
            <div className='p-3'>
                <div className='flex items-center'
                >
                    <img
                        // src="https://mui.com/static/branding/companies/nasa-dark.svg"
                        src={currUser?.profilePicture === "" ? `https://avatars.dicebear.com/api/initials/${currUser?.userName}.svg` : currUser?.profilePicture}
                        alt="profile pic"
                        draggable="false"
                        className='object-cover rounded-full cursor-pointer w-12 h-12 mr-2'
                    />
                    <input
                        ref={desc}
                        type="text"
                        placeholder={"What's in your mind " + currUser?.userName + "?"}
                        className='w-full focus:outline-none rounded-md dark:bg-navBar_secondary text-black dark:text-navBar_Text p-1.5' />
                </div>
                <hr className='my-4' />
                <div className='mt-4'>
                    <div className='flex justify-evenly'>
                        <div className='flex flex-wrap gap-2 items-center'>
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
                                        console.log("hi")
                                        if (filee.size > 3000000) {
                                            alert("File can only be below 3 mb")
                                            setFile(undefined)
                                        }
                                        else {
                                            // @ts-ignore
                                            uploadImage(filee)
                                        }
                                    }
                                }}
                                accept='.png, .jpeg, .jpg' />
                            {/* <span>Photo or Video</span> */}
                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Tag">
                                <div className='cursor-pointer p-1.5 hover:bg-blue-600 transition-all duration-300 ease-out rounded-lg'>
                                    <Label />
                                </div>
                            </Tooltip>

                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Location">
                                <div className='cursor-pointer p-1.5 hover:bg-purple-600 transition-all duration-300 ease-out rounded-lg'>
                                    <Room />
                                </div>
                            </Tooltip>

                            <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Feeling">
                                <div className='cursor-pointer p-1.5 hover:bg-yellow-600 transition-all duration-300 ease-out rounded-lg'>
                                    <EmojiEmotions />
                                </div>
                            </Tooltip>


                            {/* <Tooltip
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 400 }}
                                title="Share"> */}
                            {!upload ?
                                <button
                                    onClick={(e) => handleSubmit(e)}
                                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded'>
                                    {/* <Shortcut /> */}
                                    Post
                                </button>
                                :
                                <div>
                                    Loading
                                </div>
                            }
                            {/* </Tooltip> */}

                            {
                                // file &&
                                // <div>
                                //     {file.name}
                                // </div>
                                !upload ?
                                    imageURL !== "" &&
                                    // <img src={imageURL} />
                                    <div>Uploaded</div>
                                    :
                                    <>
                                        <LoadAnimation />
                                    </>
                            }
                        </div>


                        {/* <div className='flex gap-2 items-center'>
                            <Room className='text-purple-600' />
                            <span>Location</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <EmojiEmotions className='text-yellow-600' />
                            <span>Feeling</span>
                        </div>
                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded'>Share</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share


