import { CircularProgress } from '@mui/material';
import React from 'react'

const LoadAnimation: React.FC = () => {

    return (
        <div className='flex justify-center p-5'>
            <CircularProgress size="30px" />
            {/* <ScaleLoader color="rgb(37 99 235)" /> */}
        </div>
    )
}

export default LoadAnimation