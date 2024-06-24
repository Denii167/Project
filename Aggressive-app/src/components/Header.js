import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { icon3Target, iconbag, iconUser } from "../assets/index.js";

function Header() {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);

  return (
    <div className="w-full h-20px  bg-white border-b-[2px] border-b-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl m-1 ml-3 h-full mx-auto flex items-center justify-between">
        <div>
          <Link to="/">
            <img className="w-20" src={icon3Target} alt="icon3Target" />
          </Link>
        </div>

        <h1 className="text-4xl font-sinisFont text-gray-500 ">
          Aggressive AppStore
        </h1>

        <div>
          <ul className="flex items-center gap-7 ">
            <Link to="/cart">
              <li className="text-base text-black font-bold hover:text-purple-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer font-menuFont">
                Cart
              </li>
            </Link>

            <div className="relative">
              <Link to="/cart">
                <img className="w-12" src={iconbag} alt="cartImg" />
                <span className="absolute w-6 top-5 left-3 text-sm flex items-center justify-center font-semibold">
                  {productData.length}
                </span>
              </Link>
            </div>
            <Link to="/login">
              <img
                className="w-12 mr-2 "
                src={userInfo ? userInfo.image : iconUser}
                alt="iconUser"
              />
            </Link>
            {userInfo ? (
              <p className="mr-5 text-base underline underline-offset-2">
                {userInfo.name}
              </p>
            ) : (
              <p className="mr-5 text-base underline underline-offset-2">
                Login
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
