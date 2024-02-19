'use client'
import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'

const BlogHeader = (props: { views: number, title: string }) => {
    return (
        <div className="mb-4 gap-4 flex flex-col">
            <div className='flex flex-row items-center gap-2 w-fit p-2 pr-4 pl-4 rounded-full bg-[var(--primary)] text-[var(--snow)]'>
                <AiOutlineEye className='text-sm' />
                <p className='text-sm'>{props.views + ((props.views === 1) ? " view" : " views")}</p>
            </div>
            <h1 className="font-bold text-5xl">{props.title}</h1>
        </div>
    )
}

export default BlogHeader