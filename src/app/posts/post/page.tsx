import Header from "@/app/components/Header";
import { getPage } from "@/app/components/getData"
import { NotionRenderer } from "react-notion"
import "react-notion/src/styles.css";

const Page = async () => {
    const page = await getPage({ page: 'a141e912c0344212860c3984c2d9ea15' })

    console.log(page)

    return (
        <main>
            <Header />
            <div className="flex justify-center w-full">
                {/* <NotionRenderer blockMap={page} /> */}
                <div className="flex justify-start w-[768px]">
                    <NotionRenderer blockMap={page} />
                </div>
            </div>
        </main>
    )
}

export default Page