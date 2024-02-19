import Header from "@/app/components/Header";
import { getPage } from "@/app/components/getData"
import { NotionRenderer } from "react-notion"
import "react-notion/src/styles.css";
import { kv } from "@vercel/kv";
import ListViewCounter from "@/app/components/ListViewCounter";
import { AiOutlineEye } from "react-icons/ai";
import BlogHeader from "@/app/components/BlogHeader";

const Page = async () => {

    const page_id = '60983134-1cac-4d75-a875-00f4d2b6eb99'

    const page = await getPage({ page: page_id })

    await kv.hincrby(page_id, "views", 1)
    const views = await kv.hget(page_id, "views")

    return (
        <main>
            <Header />
            <div className="flex justify-center w-full">
                {/* <NotionRenderer blockMap={page} /> */}
                <div className="flex justify-start w-screen md:w-[768px] flex-col p-5">
                    <BlogHeader views={views as number} title={page[page_id].value.properties.title[0][0]} />
                    <NotionRenderer blockMap={page} />
                </div>
            </div>
        </main>
    )
}

export default Page