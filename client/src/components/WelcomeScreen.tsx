import React from 'react'


const WelcomeScreen = (prop: { name: string, age?: number }) => {
    return (
        <>
            <div>Age is {prop.age}</div>
            <div>Name is {prop.name}</div>
        </>
    )
}

export default WelcomeScreen