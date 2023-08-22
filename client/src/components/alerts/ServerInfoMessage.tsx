import React from 'react'
import { Alert, AlertTitle } from '@mui/material'

const ServerInfoMessage: React.FC = () => {
    return (
        <div>
            <Alert severity="info">
                <AlertTitle>Please wait for the server to wake up</AlertTitle>
                As the server is hosted in a free tier, It goes to sleep when it is inactive for 15 minutes. If you notice an initial delay please wait ~1-2 minutes for the server to wake up!
            </Alert>
        </div>
    )
}

export default ServerInfoMessage