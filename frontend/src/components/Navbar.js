import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/car2.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    navigate("/login");
    console.log("Signed out");
  };
  return (
    <nav className=" w-full  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-between px-7 py-2 md:px-4 items-center ">
      <div className="flex items-center">
        <img className="h-10 w-full" src={logo} alt="Logo" />
        <div className="text-white text-2xl font-bold pl-4">Knox</div>
      </div>

      <ul className="md:flex font-semibold hidden">
        {/* Link to Home Page */}
        <li className="mx-[10px] cursor-pointer text-white hover:text-black">
          <Link to="/home">Home</Link>
        </li>

        {/* Link to About Us Page */}
        <li className="mx-[10px] cursor-pointer text-white hover:text-black">
          <Link to="/home/about" >
            About Us
          </Link>
        </li>

        {/* Link to Contact Us Page */}
        <li className="mx-[10px] cursor-pointer text-white hover:text-black">
          <Link to="/home/contact">Contact Us</Link>
        </li>
      </ul>

      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className=" rounded-full inline-flex w-full justify-center gap-x-1   px-3 py-2 text-base font-semibold text-white hover:text-black  ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded={isOpen ? "true" : "false"}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd"
              />
            </svg>
            Account
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              <Link
                to="/account_settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                Account settings
              </Link>
              <Link
                to="/support"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-1"
              >
                Support
              </Link>
              <Link
                to="/license"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-2"
              >
                License
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-3"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <Link className="text-4xl" to="#">
          &#8801;
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
