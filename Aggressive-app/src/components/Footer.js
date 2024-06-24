import React from "react";
import { cartoesCredito, icon3Target } from "../assets";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaHome,
} from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { MdLocationOn } from "react-icons/md";
import { BsPersonFill, BsPaypal } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-gray-500 py-20 px-10 font-gunsFont">
      <div className="max-w-screen-xl mx-auto grid grid-cols-4">
        {/* === LogoIcon ==== */}

        <div className="flex flex-col gap-6">
          <Link to="/">
            <img className="w-20" src={icon3Target} alt="logo" />
          </Link>
          <p className="text-white text-sm tracking-wide">MCSD-61</p>
          <img className="w-32" src={cartoesCredito} alt="cartoesCredito" />
          <div className="flex gap-5 text-lg text-gray-500">
            <ImGithub className="hover:text-white duration-300 cursor-pointer" />
            <FaFacebook className="hover:text-white duration-300 cursor-pointer" />
            <FaTwitter className="hover:text-white duration-300 cursor-pointer" />
            <FaYoutube className="hover:text-white duration-300 cursor-pointer" />
            <FaInstagram className="hover:text-white duration-300 cursor-pointer" />
          </div>
        </div>
        {/* === LocateUs === */}
        <div>
          <h2 className="text-2x1 font-semibold text-white mb-4">locate us</h2>
          <div className="text-base flex flex-col gap-2">
            <p>Auckland, New Zealand</p>
            <p>Phone: 022 911 9110</p>
            <p>Site: agressivestore.com</p>
            <p>E-mail: aggressive@app.com</p>
            <p>Future Skills</p>
          </div>
        </div>
        {/* === Profile === */}
        <div>
          <h2 className="text-2x1 font-semibold text-white mb-4">profile</h2>

          <div className="flex flex-col gap-2 text-base">
            <Link to="/myAccount">
              <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
                <span>
                  <BsPersonFill />
                </span>
                my account
              </p>
            </Link>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span>
                <BsPaypal />
              </span>
              checkout
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span>
                <FaHome />
              </span>
              order tracking
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span>
                <MdLocationOn />
              </span>
              help & support
            </p>
          </div>
        </div>
        {/* === Subscribe === */}

        <div className=" flex flex-col justify-center">
          <input
            className="bg-transparent border px-4 py-2 text-sm"
            placeholder="e-mail"
            type="text"
          />
          <button className="text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
