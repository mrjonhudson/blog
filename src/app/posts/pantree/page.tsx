import Header from "@/app/components/Header";
import { getPage } from "@/app/components/getData"
import { NotionRenderer } from "react-notion"
import "react-notion/src/styles.css";
import { kv } from "@vercel/kv";
import ListViewCounter from "@/app/components/ListViewCounter";
import { AiOutlineEye } from "react-icons/ai";
import BlogHeader from "@/app/components/BlogHeader";

const Page = async () => {

    const page_id = '347216c6-fccf-46e7-bc6d-eaf981ee140e'

    const page = await getPage({ page: page_id })

    await kv.hincrby(page_id, "views", 1)
    const views = await kv.hget(page_id, "views")

    return (
        <main>
            <Header />
            <div className="flex justify-center w-full">
                {/* <NotionRenderer blockMap={page} /> */}
                <div className="flex justify-start w-[768px] flex-col">
                    <BlogHeader views={views as number} title={page[page_id].value.properties.title[0][0]} />

                    <NotionRenderer blockMap={page} />
                </div>
            </div>
        </main>
    )
}

export default Page