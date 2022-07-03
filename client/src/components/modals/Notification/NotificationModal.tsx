import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../features/themeSlice';
import LikeNotification from './LikeNotification';
import FollowNotification from './FollowNotification';
import { getUserData } from '../../../features/authSlice';


interface Props {
    notification: Object,
    open: boolean,
    handleClose: () => void
}

const NotificationModal: React.FC<Props> = ({ notification, open, handleClose }) => {
    const themePreference = useSelector(selectTheme)
    const [load, setLoad] = useState(false)
    const user = useSelector(getUserData)
    const currentUser = user.user

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
                        Notifications
                    </div>
                    <button
                        className={`cursor-pointer p-1.5  ${!themePreference ? "hover:bg-light_feed_primary text-black" : "hover:bg-navBar_BG text-navBar_Text"} transition-all duration-300 ease-out rounded-lg`}
                        onClick={() => handleClose()}
                    >
                        <CloseIcon className='h-4' />
                    </button>

                </div>
                <div className="flex flex-col gap-1 overflow-y-auto scrollbar-hide" style={{ height: "380px" }}>
                    {/* @ts-ignore */}
                    {notification.map((activity: any, index: number) => {
                        if (activity.type === "like") {
                            return (
                                <div
                                    key={index}
                                >
                                    <LikeNotification
                                        user={currentUser}
                                        notification={activity}
                                    />
                                </div>
                            )
                        } else {
                            return (
                                <div
                                    key={index}
                                >
                                    <FollowNotification
                                        notification={activity}
                                        user={currentUser}
                                    />
                                </div>
                            )
                        }
                    })}
                </div>

            </Box>
        </Modal>

    )
}

export default NotificationModal