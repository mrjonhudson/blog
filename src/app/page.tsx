import Image from "next/image";
import BlogList from '../app/components/BlogList'
import { getDatabase } from "./components/getData";
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import Header from "./components/Header";
import './globals.css'
import Footer from "./components/Footer";


export default async function Home() {

    const page = await getDatabase({ page: "1adcef5e4e8c4e94bdfa6ff94dfe11cb" })

    console.log(page)

    return (
        <main>
            <Header />
            <div className="flex justify-center p-5">
                {/* <NotionRenderer blockMap={page} /> */}
                <div className="flex flex-col w-[768px] gap-3 h-screen">
                    <p className="pt-5">
                        {"I build apps, websites and hardware for consumers. Currently building something new at "}
                        <span className="hover:font-bold hover:text-[var(--ef-orange)] hover:bg-[var(--ef-purple)]">{"Entrepreneur First"}</span>
                        {" ."}
                    </p>
                    <p className="font-semibold">{"Interested in what I've built?"}</p>
                    <a className="link" href="https://mrjonhudson.com">
                        Checkout my portfolio page
                    </a>
                    <h2 className="text-2xl font-semibold pt-5">Blog Posts</h2>
                    <div>
                        {page.map((pg: any, index: number) => (
                            <BlogList key={index} page={pg} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
