import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSearchTerms } from '../../api/searchAPI'



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

    useEffect(() => {
        if (searchTerm === "") {
            setSuggestions([])
        }
    }, [searchTerm])

    const getSuggestions = async () => {
        try {
            const res = await getSearchTerms(searchTerm)
            setSuggestions(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <input
                onChange={(e) => handleInput(e)}
                style={{ width: "350px" }}
                type="text"
                className='focus:outline-none rounded-md dark:bg-navBar_secondary text-black dark:text-navBar_Text p-1.5'
                placeholder='search for friend, post or video' />

            {searchTerm !== "" && <div className='absolute overflow-y-auto scrollbar-hide rounded-lg bg-navBar_BG text-navBar_Text max-h-36' >
                {suggestions.map((search, index) => {
                    return (
                        <>
                            {/* @ts-ignore  */}
                            <Link key={index} to={`/profile/${search?.email}`}>
                                <div
                                    style={{ width: "350px" }}
                                    className='flex items-center p-1 gap-2'
                                >
                                    {/* @ts-ignore  */}
                                    <img src={search?.profilePicture} alt="" className='rounded-full h-8' draggable="false" />
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