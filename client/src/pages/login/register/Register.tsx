import React, { useEffect, useRef, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'
import { newUserCredentials } from '../../../components/interfaces/userCredentials'
import { createUser } from '../../../api/authAPI'
import { getErrorMessage } from '../../../components/helpers/errorMessageGenerator'


const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const pwdRef = useRef<HTMLInputElement>(null)
    const confPwdRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const signUp = async (credentials: newUserCredentials) => {
        try {
            const res = await createUser(credentials)
            console.log(res.data)
            navigator("login")
        } catch (error) {
            console.log(error)
            setError(getErrorMessage(error))
        }
    }

    const navigator = (url: string) => {
        navigate(`/${url}`)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (pwdRef?.current?.value !== confPwdRef?.current?.value) {
            pwdRef?.current?.setCustomValidity("Passwords don't match")
        } else {
            if (nameRef?.current?.value && emailRef?.current?.value && pwdRef?.current?.value) {
                const user = {
                    userName: nameRef.current.value,
                    email: emailRef.current.value,
                    password: pwdRef.current.value,
                }
                signUp(user)
            }
        }

    }

    // useEffect(() => {
    //     if (pwdRef?.current?.value !== confPwdRef?.current?.value)
    //         setError("Passwords don't match")

    //     console.log(pwdRef?.current?.value)
    // }, [pwdRef, confPwdRef])

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black'>
            <div className='flex flex-col items-center justify-center gap-8 lg:gap-20 md:flex-row lg:flex-row mx-4 p-5 lg:p-20 rounded-lg  '>
                <div className='flex flex-col items-center justify-center gap-3'>
                    <div className='font-bold text-3xl md:text-5xl lg:text-7xl'>OctoVerse</div>
                    <span className='lg:text-2xl'>Connect with friends around the world</span>
                </div>
                <div>
                    <div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className='flex flex-col p-10 lg:p-14 gap-3 dark:bg-dark_feed_secondary shadow-lg bg-light_feed_secondary rounded-lg'>
                                <span className='font-bold text-2xl text-center'>Register</span>
                                <input
                                    type="text"
                                    ref={nameRef}
                                    placeholder='UserName'
                                    className='focus:outline-none w-64 rounded-md dark:bg-navBar_BG bg-sideBar_light_secondary text-black dark:text-navBar_Text p-1.5'
                                    required
                                    autoFocus
                                    autoComplete='false'
                                />
                                <input
                                    ref={emailRef}
                                    type="email"
                                    placeholder='Email'
                                    className='focus:outline-none bg-sideBar_light_secondary w-64 rounded-md dark:bg-navBar_BG text-black dark:text-navBar_Text p-1.5'
                                    required
                                    autoComplete='false'
                                />
                                <div>
                                    <div
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute text-end  cursor-pointer mt-1 ml-56 text-black dark:text-navBar_Text'>
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
                                        ref={pwdRef}
                                        type={showPassword ? "text" : "password"}
                                        placeholder='password'
                                        className='focus:outline-none bg-sideBar_light_secondary w-full rounded-md dark:bg-navBar_BG text-black dark:text-navBar_Text p-1.5'
                                        autoComplete='false'
                                        required
                                    />
                                </div>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    ref={confPwdRef}
                                    placeholder='Re enter password'
                                    className='focus:outline-none rounded-md bg-sideBar_light_secondary dark:bg-navBar_BG text-black dark:text-navBar_Text p-1.5'
                                    autoComplete='false'
                                    required
                                />
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>
                                    Sign Up
                                </button>

                                <span
                                    className='text-blue-600 hover:text-purple-600 cursor-pointer'>
                                    Forgot Password?
                                </span>
                                <Link to='/login'>
                                    <div
                                        className=' w-full text-center cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded'>
                                        Log Into account
                                    </div>
                                </Link>

                                {/* {error != "" && <span className='font-bold bg-red-600 text-white py-1 px-3 rounded text-center'>
                                    Passwords don't match
                                </span>} */}
                            </div>

                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Register