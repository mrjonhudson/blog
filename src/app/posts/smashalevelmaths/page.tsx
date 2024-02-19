import Header from "@/app/components/Header";
import { getPage } from "@/app/components/getData"
import { NotionRenderer } from "react-notion"
import "react-notion/src/styles.css";
import { kv } from "@vercel/kv";
import ListViewCounter from "@/app/components/ListViewCounter";
import { AiOutlineEye } from "react-icons/ai";

const Page = async (props: { title: string }) => {

    const page_id = '60983134-1cac-4d75-a875-00f4d2b6eb99'

    const page = await getPage({ page: page_id })

    await kv.hincrby(page_id, "views", 1)
    const views = await kv.hget(page_id, "views")

    return (
        <main>
            <Header />
            <div className="flex justify-center w-full">
                {/* <NotionRenderer blockMap={page} /> */}
                <div className="flex justify-start w-[768px] flex-col">
                    <div className="mb-4 gap-4 flex flex-col">
                        <div className='flex flex-row items-center gap-2 w-fit p-2 pr-4 pl-4 rounded-full bg-[var(--primary)] text-[var(--snow)]'>
                            <AiOutlineEye className='text-sm' />
                            <p className='text-sm'>{views + ((views === 1) ? " view" : " views")}</p>
                        </div>
                        <h1 className="font-semibold text-3xl">{page[page_id].value.properties.title[0][0]}</h1>
                    </div>
                    <NotionRenderer blockMap={page} />
                </div>
            </div>
        </main>
    )
}

export default Page