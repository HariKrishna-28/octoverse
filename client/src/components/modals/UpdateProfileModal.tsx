import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/themeSlice';
// import { updatePost } from '../../api/postAPI';
import LoadAnimation from '../load/LoadAnimation';
import { userProp } from '../interfaces/userProps';
import { CircularProgress, Tooltip, Zoom } from '@mui/material';
import { PermMedia } from '@mui/icons-material';
import { v4 as uuid } from 'uuid'
// import { uploadPost } from '../../api/postAPI';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase';
import { UPDATE_USER } from '../../api/userAPI';


interface Props {
    handleClose: (flag: boolean) => void,
    open: boolean,
    // userId: string,
    // postId: string,
    // imageUrl: string | undefined,
    // description: string,
    user: userProp
}

const UpdateProfileModal: React.FC<Props> = ({ handleClose, open, user }) => {
    const themePreference = useSelector(selectTheme)
    const [description, setDescription] = useState(user?.description)
    const [from, setFrom] = useState(user?.from)
    const [city, setCity] = useState(user?.city)
    // const [coverPic, setCoverPic] = useState(user?.coverPicture)
    const [imageUp, setimageUp] = useState(false)
    const [load, setLoad] = useState(false)
    const [url, setUrl] = useState("")
    const [updatedCover, setUpdatedCover] = useState(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: themePreference ? "#0D1117" : "#FFFFFF",
        boxShadow: 24,
        borderRadius: 3,
        p: 3,
        color: themePreference ? "#F0F6FC" : "black",
        '@media (max-width: 600px)': {
            width: '90%',
            height: '70%',
        },
    };

    const cleanUp = () => {
        setFrom(user?.from)
        setCity(user?.city)
        setDescription(user?.description)
        setUrl("")
        setUpdatedCover(false)
    }

    const updateThisProfile = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoad(true)

        const data = {
            userId: user._id,
            from: from,
            description: description,
            city: city,
            coverPicture: url
        }
        try {
            const res = await UPDATE_USER(data, user._id)
            console.log(res.data)
            handleClose(true)
        } catch (error) {
            console.log(error)
        }
        setLoad(false)
    }

    const uploadImage = async (image: File) => {
        try {
            const id = `coverPhoto/${uuid().slice(0, 10)}`
            const imageRef = ref(storage, id)
            // @ts-ignore
            await uploadBytes(imageRef, image)
                .then(() => {
                    getDownloadURL(imageRef)
                        .then((url) => {
                            setUrl(url)
                            setUpdatedCover(true)
                        })
                }).catch(err => {
                    // setError(err.message)
                    console.log(err.message)
                })
        } catch (error) {
            alert(error)
        }
        setimageUp(false)
    }

    return (
        <Modal
            open={open}
            onClose={() => handleClose(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className='text-discord_chatINputText'
                sx={style}
            >
                <div className='flex items-center justify-between p-3'>
                    <div className='text-2xl font-bold'>
                        Update Profile
                    </div>
                    <button
                        className={`cursor-pointer p-1.5  ${!themePreference ? "hover:bg-light_feed_primary text-black" : "hover:bg-navBar_BG text-navBar_Text"} transition-all duration-300 ease-out rounded-lg`}
                        onClick={() => {
                            // setDesc(description)
                            cleanUp()
                            // setFrom(user?.from)
                            // setCity(user?.city)
                            // setDescription(user?.description)
                            handleClose(false)
                        }}
                    >
                        <CloseIcon className='h-4' />
                    </button>
                </div>

                <div>
                    <div className='flex items-center justify-between '>
                        <div className='flex items-center gap-1 mt-4 ml-3'>
                            <img
                                src={user?.profilePicture}
                                alt=""
                                className='h-10 rounded-full'
                                draggable="false"

                            />
                            <div className='font-bold'>{user?.userName}</div>

                        </div>
                        <div className='mr-3'>
                            {!imageUp ?
                                <Tooltip TransitionComponent={Zoom}
                                    TransitionProps={{ timeout: 400 }}
                                    title="Change cover photo">
                                    <label
                                        htmlFor="image-upload"
                                        className={`cursor-pointer p-1.5  ${!themePreference ? "hover:bg-light_feed_primary text-black" : "hover:bg-navBar_BG text-navBar_Text"} transition-all duration-300 ease-out rounded-lg`}
                                    // className='cursor-pointer p-1.5 hover:bg-red-600 transition-all duration-300 ease-out rounded-lg'
                                    >
                                        <PermMedia className={`${url !== "" ? "text-green-600" : ""}`} />
                                    </label>
                                </Tooltip>
                                :
                                <div className='h-2'>
                                    <CircularProgress />
                                </div>

                            }
                            <input
                                // hidden input for image upload
                                className='hidden'
                                id='image-upload'
                                type="file"
                                onChange={(e) => {
                                    // @ts-ignore
                                    const filee = e.target.files[0]
                                    if (filee !== undefined) {
                                        if (filee.size > 3000000) {
                                            alert("File can only be below 3 mb")
                                        }
                                        else {
                                            setimageUp(true)
                                            uploadImage(filee)
                                        }
                                    }
                                }}
                                accept='.png, .jpeg, .jpg' />
                        </div>

                    </div>

                    <form onSubmit={(e) => updateThisProfile(e)} className='flex flex-col gap-3 p-5'>
                        <div>
                            <label htmlFor='desc' className='font-bold'>Description</label>
                            <input
                                id='desc'
                                placeholder='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                autoComplete='false'
                                className={`focus:outline-none rounded-md ${!themePreference ? "bg-light_feed_primary text-black" : "bg-dark_feed_primary text-navBar_Text"} w-full p-1.5`}
                                type="text"
                            />
                        </div>

                        <div className='flex gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor='from' className='font-bold'>From</label>
                                <input
                                    id='from'
                                    placeholder='From'
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    autoComplete='false'
                                    className={`focus:outline-none rounded-md ${!themePreference ? "bg-light_feed_primary text-black" : "bg-dark_feed_primary text-navBar_Text"} w-full p-1.5`}
                                    type="text"
                                />
                            </div>

                            <div className='w-1/2'>
                                <label htmlFor='city' className='font-bold'>City</label>
                                <input
                                    id='city'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    autoComplete='false'
                                    className={`focus:outline-none rounded-md ${!themePreference ? "bg-light_feed_primary text-black" : "bg-dark_feed_primary text-navBar_Text"} w-full p-1.5`}
                                    type="text"
                                />
                            </div>
                        </div>

                        {
                            url !== "" &&
                            <div>
                                Uploaded
                            </div>
                        }

                        <div className='flex items-center justify-center gap-2'>
                            {
                                !load ?
                                    // @ts-ignore
                                    city !== user?.city | from !== user?.from | description !== user?.description | updatedCover &&
                                    <button
                                        type='submit'
                                        // onClick={updateThisPost}
                                        style={{ width: "100px" }}
                                        className='px-3 py-1 font-bold text-white bg-green-500 rounded hover:bg-green-700'>
                                        Update
                                    </button>
                                    :
                                    <LoadAnimation />
                            }

                        </div>
                    </form>

                </div>

            </Box>
        </Modal >
    )
}

export default UpdateProfileModal
