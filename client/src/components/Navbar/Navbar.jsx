import React, { useEffect, useState } from "react";
import logo from "/images/logo.png";
import ModalLogin from "../ModalLogin";
import useAuth from "../../hooks/useAuth";
import { FaRegUser } from "react-icons/fa";
import Profile from "./Profile";

const Navbar = () => {
  const { user, loading } = useAuth();

  //handle scroll
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <details>
          <summary>Class</summary>
          <ul className="p-2">
            <li>
              <a href="/class">All</a>
            </li>
            <li>
              <a></a>
            </li>
            <li>
              <a></a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a>For Instructors</a>
            </li>
            <li>
              <a>For Students</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>About Us</a>
      </li>
    </>
  );
  return (
    //
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a href="/" className="flex items-center">
            <img className="h-16" src={logo} alt="Logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end gap-2">
          {user ? (
            <>
              <Profile user={user} />
            </>
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn flex items-center gap-2 rounded-full px-6 bg-light-blue text-white"
            >
              <FaRegUser /> Login
            </button>
          )}
          <ModalLogin />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
