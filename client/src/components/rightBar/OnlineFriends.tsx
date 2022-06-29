import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { getUserData } from '../../features/authSlice'


const OnlineFriends: React.FC = () => {
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null!)
    const user = useSelector(getUserData)
    const currentUser = user.user

    useEffect(() => {
        // @ts-ignore
        setSocket(io("ws/localhost:8000"))
        // @ts-ignore
        socket.current.emit("addUser", currentUser?._id)
        // @ts-ignore
        socket.current.on("getUsers", (users) => {
            console.log("users")
        })
    }, [])

    return (
        <div>OnlineFriends</div>
    )
}

export default OnlineFriends