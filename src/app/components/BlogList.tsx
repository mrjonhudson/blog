import { format } from "date-fns"
import Link from "next/link"
import { useState } from "react"
import ListViewCounter from "./ListViewCounter"

const BlogList = (props: { page: any }) => {

    return (
        <Link className="hover:bg-gray-100 flex-col flex justify-center w-full p-4 rounded-md pb-8"
            href={`/posts/${props.page.URL}`}
        >
            <ListViewCounter page={props.page.id} />
            <p className="text-sm text-gray-500">{format(new Date(props.page.date ? props.page.date : Date.now()), "MMMM do yyyy")}</p>
            <p className="text-xl font-semibold">{props.page.name}</p>
        </Link>
    )
}

export default BlogList
{/* <a href={`/posts/${props.page.Name}`}>{props.page.Name}</a> */ }