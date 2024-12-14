import { Link } from 'react-router'

const Navbar = () => {
    return (
        <nav className="bg-blue-500 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">PharmaTrack</h1>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="hover:text-gray-200">Home</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-gray-200">Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
