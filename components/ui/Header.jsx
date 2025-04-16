

export default function Header() {

    return (
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
            <div className="mx-10">
                <a className="mx-7 p-1 px-2 bg-white hover:shadow-lg rounded-md" href="/">Log In</a>
                <a className="mx-7 p-1 px-2 bg-white hover:shadow-lg rounded-md" href="/">Contacts</a>
                <a className="mx-7 p-1 px-2 bg-white hover:shadow-lg rounded-md" href="/">About Us</a>
            </div>
        </div>
    );
}