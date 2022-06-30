import React from 'react'
import { newsProps } from '../interfaces/newsProps'
import moment from 'moment'

interface Props {
    news: newsProps
}

const NewsBlock: React.FC<Props> = ({ news }) => {
    return (
        <div className='dark:list__cards__dark list__cards__light transition-all duration-200 ease-out my-1'>
            <a href={news.link} target="_blank" rel="noopener noreferrer">
                <div className='text-sm text-blue-600'>
                    {moment(news.published_date).fromNow()}
                </div>
                <span className='text-sm font-bold'>
                    {news.title}
                </span>
            </a>
        </div>
    )
}

export default NewsBlock