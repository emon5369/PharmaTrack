const Footer = () => {
    return (
        <footer className="bg-blue-600 text-white py-3">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Left Section */}
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-semibold">PharmaTrack</h2>
                    <p className="text-sm mt-1">
                        © {new Date().getFullYear()} PharmaTrack. All rights reserved.
                    </p>
                </div>

                {/* Middle Section */}
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a
                        href="#"
                        className="hover:text-gray-300 transition"
                        aria-label="Facebook"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.847v-3.622h2.973V8.413c0-2.949 1.796-4.556 4.415-4.556 1.255 0 2.333.093 2.648.134v3.073h-1.815c-1.426 0-1.701.676-1.701 1.67v2.188h3.4l-.443 3.622h-2.957V24h5.784c.732 0 1.325-.593 1.325-1.324V1.325C24 .593 23.407 0 22.675 0z" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-300 transition"
                        aria-label="Twitter"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.723 9.864 9.864 0 01-3.127 1.196 4.918 4.918 0 00-8.384 4.482A13.959 13.959 0 011.671 3.15a4.917 4.917 0 001.523 6.573 4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.926 4.926 0 004.604 3.417A9.867 9.867 0 010 19.54a13.936 13.936 0 007.548 2.212c9.051 0 13.998-7.496 13.998-13.986 0-.213-.004-.426-.015-.637A9.936 9.936 0 0024 4.557z" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-300 transition"
                        aria-label="LinkedIn"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19.998 3H4.002C2.897 3 2 3.897 2 5.002v13.996C2 20.103 2.897 21 4.002 21h15.996C21.103 21 22 20.103 22 18.998V5.002C22 3.897 21.103 3 19.998 3zM8.547 17.362H5.953V9.807h2.594v7.555zM7.25 8.562a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11.057 8.8h-2.594v-3.947c0-.942-.338-1.585-1.183-1.585-.646 0-1.034.435-1.202.855-.062.15-.078.361-.078.572v4.105h-2.594s.034-6.66 0-7.555h2.594v1.07c.344-.531.961-1.287 2.336-1.287 1.705 0 2.981 1.113 2.981 3.501v4.271z" />
                        </svg>
                    </a>
                </div>

                {/* Right Section */}
                <div className="text-center md:text-right mt-4 md:mt-0">
                    <p>Contact Us: <span className="font-semibold">support@pharmatrack.com</span></p>
                    <p>Phone: <span className="font-semibold">+880 123-456-789</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
