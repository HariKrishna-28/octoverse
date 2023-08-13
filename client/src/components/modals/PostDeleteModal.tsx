import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/themeSlice';
import { DELETE_POST } from '../../api/postAPI';
import LoadAnimation from '../load/LoadAnimation';


interface Props {
    handleClose: (flag: boolean) => void,
    open: boolean,
    userId: string,
    postId: string,
}

const PostDeleteModal: React.FC<Props> = ({ handleClose, open, userId, postId }) => {
    const themePreference = useSelector(selectTheme)
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
    };

    const deleteThisPost = async () => {
        try {
            setLoad(true)
            const res = await DELETE_POST(postId, userId)
            console.log(res.data)
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
                        Delete Post
                    </div>
                    <button
                        className={`cursor-pointer p-1.5  ${!themePreference ? "hover:bg-light_feed_primary text-black" : "hover:bg-navBar_BG text-navBar_Text"} transition-all duration-300 ease-out rounded-lg`}
                        onClick={() => handleClose(false)}
                    >
                        <CloseIcon className='h-4' />
                    </button>
                </div>

                <div>
                    <div className='p-2 mb-2 text-sm font-light text-center'>
                        Do you want to delete?
                        <span className='mx-1 font-bold text-discord_purple'>
                        </span>
                        This action won't be reversed.
                    </div>

                    <div className='flex items-center justify-center gap-2'>
                        {!load ? <>
                            <button
                                onClick={deleteThisPost}
                                style={{ width: "50px" }}
                                className='px-3 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700'>
                                Yes
                            </button>

                            <button
                                style={{ width: "50px" }}
                                onClick={() => handleClose(false)}
                                className='px-3 py-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
                                No
                            </button>
                        </>
                            :
                            <LoadAnimation />
                        }
                    </div>
                </div>

            </Box>
        </Modal>
    )
}

export default PostDeleteModal