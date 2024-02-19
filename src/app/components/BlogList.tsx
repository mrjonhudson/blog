'use client'
import { format } from "date-fns"
import Link from "next/link"
import { useState } from "react"

const BlogList = (props: { page: any }) => {

    const [hover, setHover] = useState(false)

    return (
        <Link className="hover:bg-gray-100 flex-col flex justify-center w-full p-4 rounded-md pb-6"
            href={`/posts/${props.page.URL}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <p className="text-base text-gray-500">{format(new Date(props.page.date), "MMMM do yyyy")}</p>
            <p className="text-l font-semibold">{props.page.name}</p>
        </Link>
    )
}

export default BlogList
{/* <a href={`/posts/${props.page.Name}`}>{props.page.Name}</a> */ }