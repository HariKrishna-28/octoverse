import React from 'react'
import { ScaleLoader } from "react-spinners";

const LoadAnimation: React.FC = () => {

    return (
        <div className='flex justify-center'>
            <ScaleLoader color="rgb(37 99 235)" />
        </div>
    )
}

export default LoadAnimation