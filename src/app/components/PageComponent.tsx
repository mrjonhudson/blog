import { kv } from '@vercel/kv'
import React from 'react'
import { NotionRenderer } from 'react-notion'
import BlogHeader from './BlogHeader'
import Header from './Header'
import { getPage } from './getData'
import Footer from './Footer'
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import BlogFooter from './BlogFooter'

const Page = async (props: { page_id: string }) => {

    console.log(props.page_id)

    const page = await getPage({ page: props.page_id })

    await kv.hincrby(props.page_id, "views", 1)
    const views = await kv.hget(props.page_id, "views")

    return (
        <main>
            <Header />
            <div className="flex justify-center w-full">
                {/* <NotionRenderer blockMap={page} /> */}
                <div className="flex justify-start w-screen md:w-[768px] flex-col p-5">
                    <BlogHeader views={views as number} title={page[props.page_id].value.properties.title[0][0]} />
                    <NotionRenderer blockMap={page} />
                </div>
            </div>
            <BlogFooter />
        </main>
    )
}

export default Page