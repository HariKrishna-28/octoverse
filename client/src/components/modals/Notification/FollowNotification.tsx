import React from 'react'

interface Prop {
    notification: Object
}

const FollowNotification: React.FC<Prop> = ({ notification }) => {
    return (
        <div>FollowNotification</div>
    )
}

export default FollowNotification