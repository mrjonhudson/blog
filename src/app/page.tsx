import Image from "next/image";
import BlogList from '../app/components/BlogList'
import { getDatabase } from "./components/getData";
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import Header from "./components/Header";
import './globals.css'


export default async function Home() {

    const page = await getDatabase({ page: "1adcef5e4e8c4e94bdfa6ff94dfe11cb" })

    console.log(page)

    return (
        <main>
            <Header />
            <div className="flex justify-center">
                {/* <NotionRenderer blockMap={page} /> */}
                <div className="flex flex-col w-[768px] justify-center gap-3">
                    <p className="pt-5">
                        I build apps, websites and hardware for consumers. Currently building something new at Entrepreneur First.
                        <br />
                        <br />
                        <a className="link" href="https://mrjonhudson.com">
                            Checkout my portfolio page
                        </a>
                        .
                    </p>
                    <h2 className="text-2xl font-semibold">Blog Posts</h2>
                    <div>
                        {page.map((pg: any, index: number) => (
                            <BlogList key={index} page={pg} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
