import React, { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToCart } from "../redux/bazarSlice";
import { ToastContainer, toast } from "react-toastify";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  let [baseQty, setBaseQty] = useState(1);
  const location = useLocation(); // useState
  //const image = location.state.product.image;

  useEffect(() => {
    setDetails(location.state.item);
  }, []);

  return (
    <div>
      <div>
        <div className="max-w-screen-xl mx-auto my-10 flex gap-10">
          <div className="w-2/5 relative">
            <img
              className="w-full h-[550px] object-cover ml-3"
              src={details.image}
              alt="productImg"
            />
            <div className="absolute top-4 right-0">
              {details.isNew && (
                <p className="bg-black text-white font-semibold px-8 py-1">
                  Sale
                </p>
              )}
            </div>
          </div>
          <div className="w-3/5">
            <div>
              <h2 className="text-4x1 font-semibold">{details.title}</h2>
              <div>
                {details.isNew ? (
                  <>
                    <p className="line-through font-base text-gray-500">
                      ${details.oldPrice}
                    </p>
                    <p className="tesxt-2x1 font-medium text-gray-900">
                      ${details.price}
                    </p>
                  </>
                ) : (
                  <p className="font-base text-gray-500">${details.oldPrice}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-base">
              <div className="flex">
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
              </div>
              <div>
                <p className="text-xs text-gray-500">(1 Customer review)</p>
              </div>
            </div>

            <div className="flex gap-4 mt-6 ">
              <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
                <p className="text-sm">Quantity</p>
                <div className="flex item-center gap-4 text-sm font-semibold">
                  <button
                    onClick={() =>
                      setBaseQty(baseQty === 1 ? (baseQty = 1) : baseQty - 1)
                    }
                    className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span className="text-red-400">{baseQty}</span>
                  <button
                    onClick={() => setBaseQty(baseQty + 1)}
                    className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: details._id,
                      title: details.title,
                      image: details.image,
                      price: details.price,
                      quantity: baseQty,
                      description: details.des,
                    })
                  ) & toast.success(`${details.title} was added`)
                }
                className="bg-black text-white py-3 px-6 hover:bg-gray-800 active:bg-white active:text-black"
              >
                add to cart
              </button>
            </div>
            <div className="mt-5">
              <p className="text-base text-gray-500 ">
                Category:{" "}
                <span className="font-medium capitalize text-purple-700">
                  {details.category}
                </span>
              </p>
            </div>
            <div className="mt-7 font-styleFont">
              <p className="text-base  text-blue-500 -mt-3">{details.des}</p>
            </div>
            <Link to="/">
              <button className="mt-5 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300 active:text-red-500">
                <span>
                  <HiOutlineArrowLeft />
                </span>
                Go shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Product;
