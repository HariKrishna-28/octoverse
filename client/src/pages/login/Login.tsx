import React, { useEffect, useState } from 'react'
// import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, setUserStatus } from '../../features/authSlice'
import { userCredentials } from '../../components/interfaces/userCredentials'
import { LOGIN } from '../../api/authAPI'
// import { CircularProgress } from '@mui/material'
import { getErrorMessage } from '../../components/helpers/errorMessageGenerator'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase'
import LoadAnimation from '../../components/load/LoadAnimation';
import { Google } from '@mui/icons-material';
import Cookies from 'js-cookie'


const Login: React.FC = () => {

    // @ts-ignore
    const [authLoading] = useAuthState(auth)
    // @ts-ignore

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [flag, setFlag] = useState(false)
    // const userAuthStats = useSelector(getUserData)
    // const authToken = useSelector(selectToken)
    const authToken = Cookies.get('idToken')

    const signIn = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await auth.signInWithPopup(provider)
            .then((res) => {
                const data = res.user
                data?.getIdToken(true)
                    .then(token => {
                        Cookies.set("idToken", token)
                        const cred = {
                            userName: data?.displayName,
                            email: data?.email,
                            profilePicture: data?.photoURL
                        }
                        initialiseUser(cred)
                    })
            })
            .catch((err) => {
                alert(err.message)
            })
    }

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
            const res = await LOGIN(credentials)
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


    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen text-black dark:bg-dark_feed_primary bg-light_feed_primary dark:text-dark_Text'>
            <div className='flex flex-col items-center justify-center gap-4 p-5 mx-4 rounded-lg md:flex-row lg:flex-row lg:p-20 lg:gap-20 '>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='text-3xl font-bold md:text-5xl lg:text-7xl'>OctoVerse</div>
                    <span className='lg:text-2xl'>Connect with friends around the world</span>
                </div>
                <div>
                    <div>


                        {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                        <div className='flex flex-col gap-3 p-10 rounded-lg shadow-lg lg:p-16 dark:bg-dark_feed_secondary bg-light_feed_secondary'>
                            <div className='text-2xl font-bold text-center'>Login</div>

                            {!authLoading ?
                                <button
                                    className='flex items-center justify-center gap-2 px-3 py-1 font-bold text-white bg-blue-700 rounded cursor-pointer hover:bg-blue-500'
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