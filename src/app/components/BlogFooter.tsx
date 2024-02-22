import Link from 'next/link'
import React from 'react'

export default function BlogFooter() {
    return (
        <div className="flex justify-center w-screen">
            <div className="p-4 flex-col justify-center flex border-t-2 border-[var(--dusty-grey)] ml-4 mr-4 w-screen md:w-[738px]">
                <p>Thank you for reading! If you want to see future content, you can <Link
                    href={'https://twitter.com/mrjonhudson'}>
                    <span
                        className='text-[var(--primary)] hover:underline hover:cursor-pointer'>
                        follow me on twitter
                    </span></Link> or <Link
                        href={'https://linkedin.com/in/mrjonhudson'}>
                        <span
                            className='text-[var(--primary)] hover:underline hover:cursor-pointer'>
                            connect with me on LinkedIn
                        </span></Link>
                </p>
                <div className='w-full flex justify-center p-4'>
                    <p className=''>🌱 Organic produce from Shropshire</p>
                </div>
            </div>
        </div>
    )
}
