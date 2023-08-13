import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GET_SEARCH_TERMS } from '../../api/searchAPI'
import { selectToken } from '../../features/tokenSlice'



const SearchBar: React.FC = () => {
    const [suggestions, setSuggestions] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const handleInput = (e: React.SyntheticEvent) => {
        // @ts-ignore
        setSearchTerm(e.target.value)
        if (searchTerm.length === 0) {
            setSuggestions([])
        } else {
            getSuggestions()
        }
    }

    const getSuggestions = async () => {
        try {
            const res = await GET_SEARCH_TERMS(searchTerm)
            setSuggestions(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (searchTerm === "") {
            setSuggestions([])
        }
    }, [searchTerm])


    return (
        <div>
            <input
                onChange={(e) => handleInput(e)}
                style={{ width: "350px" }}
                type="text"
                className='focus:outline-none rounded-md dark:bg-navBar_secondary text-black dark:text-navBar_Text p-1.5'
                placeholder='Search for a friend' />

            {searchTerm !== "" && <div className='absolute overflow-y-auto rounded-lg scrollbar-hide bg-navBar_BG text-navBar_Text max-h-36' >
                {suggestions.map((search, index) => {
                    return (
                        <>
                            {/* @ts-ignore  */}
                            <Link key={index} to={`/profile/${search?.email}`}>
                                <div
                                    style={{ width: "350px" }}
                                    className='flex items-center gap-2 p-1 transition-all duration-300 ease-out hover:bg-dark_feed_secondary'
                                >
                                    <Avatar
                                        // @ts-ignore
                                        src={search?.profilePicture}
                                        alt=""
                                    />
                                    <span className='font-bold'>
                                        {/* @ts-ignore  */}
                                        {search?.userName}
                                    </span>
                                </div>
                            </Link>
                        </>

                    )
                })}
            </div>}
        </div>

    )
}

export default SearchBar