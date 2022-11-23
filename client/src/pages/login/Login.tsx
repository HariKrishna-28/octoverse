import React, { useEffect, useState } from 'react'
// import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, setUserStatus } from '../../features/authSlice'
import { userCredentials } from '../../components/interfaces/userCredentials'
import { login } from '../../api/authAPI'
// import { CircularProgress } from '@mui/material'
import { getErrorMessage } from '../../components/helpers/errorMessageGenerator'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase'
import LoadAnimation from '../../components/load/LoadAnimation';
import { Google } from '@mui/icons-material';
import { selectToken, setAuthToken } from '../../features/tokenSlice';


const Login: React.FC = () => {

    // @ts-ignore
    const [authLoading] = useAuthState(auth)
    // @ts-ignore

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [flag, setFlag] = useState(false)
    const userAuthStats = useSelector(getUserData)
    const authToken = useSelector(selectToken)
    // const [showPassword, setShowPassword] = useState(false)
    // const userRef = useRef<HTMLInputElement>(null)
    // const emailRef = useRef<HTMLInputElement>(null)
    // const pwdRef = useRef<HTMLInputElement>(null)

    const tokenSetter = async (user: any) => {
        await user.getIdToken(true)
            .then((token: string) => {
                dispatch(setAuthToken({
                    token: token
                }))
            })
    }

    const signIn = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await auth.signInWithPopup(provider)
            .then((res) => {
                const data = res.user
                data?.getIdToken(true)
                    .then(token => {
                        dispatch(setAuthToken({
                            token: token
                        }))
                    })
                const cred = {
                    userName: data?.displayName,
                    email: data?.email,
                    profilePicture: data?.photoURL
                }
                initialiseUser(cred)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    // useEffect(() => {
    //     if (user) {
    //         const data = {
    //             userName: user.displayName,
    //             email: user.email,
    //             profilePicture: user.photoURL,
    //         }
    //     }
    //     console.log(data)
    // }, [user])



    // const navigator = (url: string) => {
    //     navigate(`/${url}`)
    // }

    // const loginStart = (status: boolean) => {
    //     dispatch(setUserStatus({
    //         isFetching: status,
    //     }))
    // }

    const saveUserData = (user: userCredentials) => {
        dispatch(setUserStatus({
            user: user,
            isFetching: false,
            error: { message: "" }
        }))
    }

    const setUserError = (error: string) => {
        dispatch(setUserStatus({
            user: null,
            isFetching: false,
            error: { message: error }
        }))
    }

    const initialiseUser = async (credentials: any) => {
        try {
            const res = await login(credentials)
            saveUserData(res.data)
            setFlag(true)
            // navigate("/")
        } catch (error) {
            console.log(error)
            setUserError(getErrorMessage(error))
        }
    }

    useEffect(() => {
        if (!authToken) return
        if (flag) {
            navigate("/")
        }
    }, [authToken, flag])

    // const handleSubmit = (e: React.SyntheticEvent) => {
    //     e.preventDefault()
    //     loginStart(true)
    //     if (emailRef.current?.value && pwdRef.current?.value) {
    //         const credentials = {
    //             email: emailRef.current.value,
    //             password: pwdRef.current.value
    //         }
    //     }
    // }


    // useEffect(() => {
    //     userAuthStats.user && flag &&
    //         navigate("/")
    //     // eslint-disable-next-line
    // }, [userAuthStats, flag])


    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text text-black'>
            <div className='flex flex-col items-center justify-center gap-4 md:flex-row lg:flex-row mx-4 p-5 lg:p-20 lg:gap-20 rounded-lg  '>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='font-bold text-3xl md:text-5xl lg:text-7xl'>OctoVerse</div>
                    <span className='lg:text-2xl'>Connect with friends around the world</span>
                </div>
                <div>
                    <div>


                        {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                        <div className='flex flex-col p-10 lg:p-16 gap-3 dark:bg-dark_feed_secondary shadow-lg bg-light_feed_secondary rounded-lg'>
                            <div className='font-bold text-2xl text-center'>Login</div>

                            {!authLoading ?
                                <button
                                    className='cursor-pointer flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded'
                                    onClick={(e) => signIn(e)}>
                                    Login With Google <Google className='h-auto' />
                                </button>
                                :
                                <LoadAnimation />
                            }

                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login