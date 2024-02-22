import Link from "next/link";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Header = () => {
    return (
        <header>
            <div className="flex justify-center p-10">
                {/* <NotionRenderer blockMap={page} /> */}
                <div className="flex flex-col md:flex-row w-[768px] gap-3 justify-center md:justify-between">
                    <h1 className="text-3xl font-semibold justify-center flex p-3">blog.mrjonhudson</h1>
                    <div className="flex flex-row gap-5 justify-center">
                        <Link className="flex items-center justify-center text-xl md:text-3xl text-gray-500 hover:text-[var(--dark-void)]" href={"https://www.linkedin.com/in/mrjonhudson"}>
                            <FaLinkedin />
                        </Link>
                        <Link className="flex items-center justify-center text-xl md:text-3xl text-gray-500 hover:text-[var(--dark-void)]" href={"https://www.twitter.com/mrjonhudson"}>
                            <FaXTwitter />
                        </Link>
                        <Link className="flex items-center justify-center text-xl md:text-3xl text-gray-500 hover:text-[var(--dark-void)]" href={"https://www.instagram.com/mrjonhudson"}>
                            <FaInstagram />
                        </Link>
                        <Link className="flex items-center justify-center text-xl md:text-3xl text-gray-500 hover:text-[var(--dark-void)]" href={"https://github.com/mrjonhudson"}>
                            <FaGithub />
                        </Link>
                        <Link className="flex items-center justify-center text-xl md:text-3xl text-gray-500 hover:text-[var(--dark-void)]" href={"mailto:mrjonhudson@gmail.com"}>
                            <FaEnvelope />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;