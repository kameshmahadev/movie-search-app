// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const linkClasses = ({ isActive }) =>
        `px-4 py-2 rounded-md text-sm font-medium ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
        }`;

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">Movie App</div>
                <div className="flex gap-4">
                    <NavLink to="/" className={linkClasses}>
                        Home
                    </NavLink>
                    <NavLink to="/movies" className={linkClasses}>
                        Movies
                    </NavLink>
                    <NavLink to="/favorites" className={linkClasses}>
                        Favorites
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
