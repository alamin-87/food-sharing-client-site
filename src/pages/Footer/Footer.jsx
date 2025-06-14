import React, { useContext } from "react";
import { NavLink } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import "./Footer.css";

const Footer = () => {
  const { user } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="text-lg font-medium hover:text-orange-500 transition-colors dark:text-white"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/availableFoods"
          className="text-lg font-medium hover:text-orange-500 transition-colors dark:text-white"
        >
          Available Foods
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/addFood"
              className="text-lg font-medium hover:text-orange-500 transition-colors dark:text-white"
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manageMyFoods"
              className="text-lg font-medium hover:text-orange-500 transition-colors dark:text-white"
            >
              Manage My Foods
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myFoodRequest"
              className="text-lg font-medium hover:text-orange-500 transition-colors dark:text-white"
            >
              My Food Request
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <footer className="bg-gradient-to-r from-green-100 to-orange-100 text-green-900 py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-1">
              <span className="text-green-700">Dish</span>
              <span className="text-orange-500">Drop</span>
            </h2>
          </div>
          <p className="text-sm text-gray-800">
            Share and discover homemade meals with neighbors. Building stronger
            communities through food.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-lg mb-3 text-green-700">Contact Us</h3>
          <p className="flex items-center gap-2 mb-2 text-sm">
            <FaEnvelope className="text-green-600" />
            support@dishdrop.com
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaPhoneAlt className="text-green-600" />
            +1 (800) 123-4567
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-3 text-green-700">Quick Links</h3>
          <ul className="space-y-2 text-sm font-medium text-green-800">
            {links}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-3 text-green-700">Follow Us</h3>
          <div className="flex gap-5 text-xl text-green-700">
            <NavLink
              to="/facebook"
              className="hover:text-orange-500 transition"
            >
              <FaFacebookF />
            </NavLink>
            <NavLink
              to="/instagram"
              className="hover:text-orange-500 transition"
            >
              <FaInstagram />
            </NavLink>
            <NavLink to="/twitter" className="hover:text-orange-500 transition">
              <FaTwitter />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-10 text-sm text-green-700">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">DishDrop</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
