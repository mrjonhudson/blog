import { kv } from '@vercel/kv'
import React, { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'

const ListViewCounter = async (props: { page: string }) => {
    const views = await kv.hget(props.page, "views")

    return (
        <div className='flex flex-row items-center gap-2 text-gray-500'>
            <AiOutlineEye className='text-sm' />
            <p className='text-sm'>{views + ((views === 1) ? " view" : " views")}</p>
        </div>
    )
}

export default ListViewCounter