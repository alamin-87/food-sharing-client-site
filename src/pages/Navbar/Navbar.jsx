import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import "../Navbar/Navbar.css";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import ThemeToggle from "../../DarkMode/ThemeToggle";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.success("You have been logged out.");
        navigate("/signIn"); // ✅ Redirect to login or home
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Failed to log out. Try again.");
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="text-base-content font-medium hover:text-orange-500 transition-colors"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/availableFoods"
          className="text-base-content font-medium hover:text-orange-500 transition-colors"
        >
          Available Foods
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/addFood"
              className="text-base-content font-medium hover:text-orange-500 transition-colors"
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myFood"
              className="text-base-content font-medium hover:text-orange-500 transition-colors"
            >
              Manage My Foods
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myFoodRequest"
              className="text-base-content font-medium hover:text-orange-500 transition-colors"
            >
              My Food Request
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 text-base-content px-4 sticky top-0 z-50 shadow-md">
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden text-orange-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          <h2 className="text-2xl font-bold flex items-center gap-1">
            <span className="text-green-700">Dish</span>
            <span className="text-orange-500">Drop</span>
          </h2>
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
      </div>

      {/* User Section */}
      <div className="navbar-end">
        <div className="mr-4">
          <ThemeToggle />
        </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-orange-300 ring-offset-2">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/2yY4QpC/default-avatar.png"
                  }
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-10 p-3 menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-2"
            >
              <li className="text-sm font-semibold text-center px-2 py-1 text-green-600">
                {user.displayName || ""}
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm w-full text-red-500 border border-red-300 hover:bg-red-100"
                >
                  Sign Out
                </button>
              </li>
              <li>
                <Link
                  to="/updateProfile"
                  className="btn btn-sm w-full text-green-600 border border-green-300 hover:bg-green-100"
                >
                  Update Profile
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/signIn"
            className="btn btn-sm border-orange-400 text-orange-500 hover:bg-orange-100"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
