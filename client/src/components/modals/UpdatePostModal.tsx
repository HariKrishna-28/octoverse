import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/themeSlice';
import { UPDATE_POST } from '../../api/postAPI';
import LoadAnimation from '../load/LoadAnimation';


interface Props {
    handleClose: (flag: boolean) => void,
    open: boolean,
    userId: string,
    postId: string,
    imageUrl: string | undefined,
    description: string,
}

const UpdatePostModal: React.FC<Props> = ({ handleClose, open, userId, postId, imageUrl, description }) => {
    const themePreference = useSelector(selectTheme)
    const prevDesc = description
    const [desc, setDesc] = useState(description)
    const [load, setLoad] = useState(false)
    // const [success, setSuccess] = useState(false)

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

    const updateThisPost = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            setLoad(true)
            await UPDATE_POST(postId, userId, desc)
            setLoad(false)
            handleClose(true)
        } catch (error) {
            alert(error)
            setLoad(false)
            handleClose(false)
        }
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
                        Update Post
                    </div>
                    <button
                        className={`cursor-pointer p-1.5  ${!themePreference ? "hover:bg-light_feed_primary text-black" : "hover:bg-navBar_BG text-navBar_Text"} transition-all duration-300 ease-out rounded-lg`}
                        onClick={() => {
                            setDesc(description)
                            handleClose(false)
                        }}
                    >
                        <CloseIcon className='h-4' />
                    </button>
                </div>

                <div>
                    {imageUrl &&
                        <div className='flex justify-center'>
                            <img
                                src={imageUrl}
                                alt=""
                                className='rounded-lg max-h-20'
                                draggable="false"
                            />
                        </div>}

                    <form onSubmit={(e) => updateThisPost(e)} className='p-5'>
                        <input
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            autoComplete='false'
                            className={`focus:outline-none rounded-md ${!themePreference ? "bg-light_feed_primary text-black" : "bg-dark_feed_primary text-navBar_Text"} w-full p-1.5`}
                            type="text"
                        />

                        <div className='flex items-center justify-center gap-2'>
                            {!load ? desc !== prevDesc && <>
                                <button
                                    type='submit'
                                    // onClick={updateThisPost}
                                    style={{ width: "100px" }}
                                    className='px-3 py-1 font-bold text-white bg-green-500 rounded hover:bg-green-700'>
                                    Update
                                </button>

                            </>
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

export default UpdatePostModal