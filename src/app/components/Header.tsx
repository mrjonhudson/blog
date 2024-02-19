import Link from "next/link";
import { FaEnvelope, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Header = () => {
    return (
        <header>
            <div className="flex justify-center p-10">
                {/* <NotionRenderer blockMap={page} /> */}
                <div className="flex flex-row w-[768px] gap-3 justify-between">
                    <h1 className="text-3xl font-semibold">blog.mrjonhudson</h1>
                    <div className="flex flex-row gap-5">
                        <Link className="flex items-center justify-center text-3xl text-gray-500 hover:text-[var(--dark-void)]" href={""}>
                            <FaLinkedin />
                        </Link>
                        <Link className="flex items-center justify-center text-3xl text-gray-500 hover:text-[var(--dark-void)]" href={""}>
                            <FaXTwitter />
                        </Link>
                        <Link className="flex items-center justify-center text-3xl text-gray-500 hover:text-[var(--dark-void)]" href={""}>
                            <FaInstagram />
                        </Link>
                        <Link className="flex items-center justify-center text-3xl text-gray-500 hover:text-[var(--dark-void)]" href={""}>
                            <FaEnvelope />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;