import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Company Management</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-300 transition duration-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/companies" className="hover:text-blue-300 transition duration-200">
              Companies
            </Link>
          </li>
          <li>
            <Link to="/employees" className="hover:text-blue-300 transition duration-200">
              Employees
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
