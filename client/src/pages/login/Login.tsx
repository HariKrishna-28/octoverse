import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black'>
            <div className='flex flex-col items-center justify-center gap-4 md:flex-row lg:flex-row mx-4 p-5 lg:p-20 rounded-lg  '>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='font-bold text-5xl'>OctoVerse</div>
                    <span>Connect with friends around the world</span>
                </div>
                <div>
                    <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className='flex flex-col p-10 lg:p-16 gap-3 dark:bg-dark_feed_secondary shadow-lg bg-light_feed_secondary rounded-lg'>
                                <span className='font-bold text-2xl text-center'>Login</span>
                                <input
                                    type="text"
                                    placeholder='UserName'
                                    className='focus:outline-none w-64 rounded-md dark:bg-navBar_BG bg-sideBar_light_secondary text-black dark:text-navBar_Text p-1.5'
                                    required
                                    autoFocus
                                    autoComplete='false'
                                />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    className='focus:outline-none w-64 rounded-md dark:bg-navBar_BG bg-sideBar_light_secondary text-black dark:text-navBar_Text p-1.5'
                                    required
                                    autoComplete='false'
                                />
                                <div>
                                    <div
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute text-end cursor-pointer mt-1 ml-56 text-black dark:text-navBar_Text'>
                                        {showPassword ?
                                            <>
                                                <VisibilityOff />
                                            </>
                                            :
                                            <>
                                                <Visibility />
                                            </>
                                        }
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder='password'
                                        className='focus:outline-none w-full rounded-md dark:bg-navBar_BG text-black bg-sideBar_light_secondary dark:text-navBar_Text p-1.5'
                                        autoComplete='false'
                                        required
                                    />
                                </div>
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>
                                    Log In
                                </button>
                                <span
                                    className='text-blue-600 hover:text-purple-600 cursor-pointer'>
                                    Forgot Password?
                                </span>
                                <button
                                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded'>
                                    Create new account
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login