"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react";
export default function Header() {
    const [hamOpen, sethamOpen] = useState(false);

    return (
        <>
            <div className="bg-[#f0f0f0] h-15 flex justify-between items-center">
                <div>
                    <a href="/">
                        <img
                            alt="Car Logo"
                            width={90}
                            height={30}
                            src="/Logo.svg"></img>
                    </a>
                </div>
                <nav className="mx-10 flex max-[570px]:hidden">
                    <a className="mx-6 px-2 bg-white hover:shadow-lg rounded-md" href="/">Login</a>
                    <a className="mx-6 px-2 bg-white hover:shadow-lg rounded-md" href="#">Contacts</a>
                    <a className="mx-6 px-2 bg-white hover:shadow-lg rounded-md" href="#">About Us</a>
                </nav>
                <button className="min-[570px]:hidden m-5 p-2" onClick={() => sethamOpen(!hamOpen)}>
                    {hamOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {hamOpen ?
                <nav className="min-[570px]:hidden bg-white shadow-md">
                    <ul className="flex flex-col items-start p-4 space-y-2">
                        <li><a href="/" className="block w-full">Login</a></li>
                        <li><a href="#" className="block w-full">Contacts</a></li>
                        <li><a href="#" className="block w-full">About Us</a></li>
                    </ul>
                </nav>
                : null}
        </>
    );
}