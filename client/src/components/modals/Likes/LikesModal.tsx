import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../features/themeSlice';
import { userFriendsProp } from '../../interfaces/userProps';
import { GET_LIKES } from '../../../api/postAPI';
import LoadAnimation from '../../load/LoadAnimation';
import LikesList from './LikesList';
import Cookies from 'js-cookie';
// import LikeNotification from './LikeNotification';
// import FollowNotification from './FollowNotification';
// import { getUserData } from '../../../features/authSlice';
// import SideBarLists from '../../sideBar/SideBarLists';


interface Props {
    postId: string,
    open: boolean,
    handleClose: () => void
}

const LikesModal: React.FC<Props> = ({ postId, open, handleClose }) => {
    const themePreference = useSelector(selectTheme)
    const [load, setLoad] = useState(false)
    const [likesData, setLikesData] = useState<userFriendsProp>(null!)
    const tok = Cookies.get('idToken')
    // const [load, setLoad] = useState(false)
    // const user = useSelector(getUserData)
    // const currentUser = user.user

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 750,
        height: 500,
        bgcolor: themePreference ? "#0D1117" : "#FFFFFF",
        boxShadow: 24,
        borderRadius: 3,
        p: 3,
        color: themePreference ? "#F0F6FC" : "black",
    };

    const postLikesData = async (postId: string) => {
        try {
            const res = await GET_LIKES(postId)
            setLikesData(res.data)
        } catch (error) {
            console.log(error)
        }
        setLoad(false)
    }

    useEffect(() => {
        if (!tok) return
        setLoad(true)
        postLikesData(postId)
    }, [tok])



    return (
        <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className='text-discord_chatINputText'
                sx={style}
            >
                <div className='flex items-center justify-between p-3'>
                    <div className='text-2xl font-bold'>
                        Likes
                    </div>
                    <button
                        className={`cursor-pointer p-1.5  ${!themePreference ? "hover:bg-light_feed_primary text-black" : "hover:bg-navBar_BG text-navBar_Text"} transition-all duration-300 ease-out rounded-lg`}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon className='h-4' />
                    </button>

                </div>
                <div className="flex flex-col gap-1 overflow-y-auto scrollbar-hide" style={{ height: "380px" }}>
                    {
                        !load ?
                            likesData &&
                            // @ts-ignore
                            likesData.map((user: userFriendsProp, index: number) => {
                                return (
                                    <LikesList
                                        email={user.email}
                                        id={user._id}
                                        profilePicture={user.profilePicture}
                                        username={user.userName}
                                        key={index}
                                    />
                                )
                            })
                            :
                            <div className='flex flex-col items-center justify-center h-screen'>
                                <LoadAnimation />
                            </div>
                    }
                </div>

            </Box>
        </Modal>

    )
}

export default LikesModal