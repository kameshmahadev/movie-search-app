// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 flex justify-between items-center">
            <h1 className="text-white font-bold text-xl">
                Movie Search App
            </h1>
            <div className="flex gap-4">
                <Link to="/" className="text-white hover:text-gray-200">
                    Home
                </Link>
                <Link to="/favorites" className="text-white hover:text-gray-200">
                    Favorites
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
