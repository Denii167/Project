import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  decrementQuantity,
  deleteItem,
  increamentQuantity,
  resetCart,
} from "../redux/bazarSlice";
import { ToastContainer, toast } from "react-toastify";

const CartItem = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.bazar.productData);

  return (
    <div className="w-2/3 pr-10">
      <div className="w-full">
        <h2 className="text-2x1 ml-11">Shopping cart</h2>
      </div>
      <div>
        {productData.map((item) => {
          const checkPrice = item.isNew ? item.price : item.oldPrice;

          return (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 mt-4"
            >
              <div className="flex items-center gap-2">
                <MdOutlineClose
                  onClick={() =>
                    dispatch(deleteItem(item._id)) &
                    toast.error(`${item.title} was removed`)
                  }
                  className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
                />
                <img
                  className="w-32 h-32 object-cover"
                  src={item.image}
                  alt="productImg"
                />
              </div>
              <h2 className="w-52">{item.title}</h2>

              <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
                <p className="text-sm">Quantity</p>

                <div className="flex items-center gap-4 text-sm font-semibold">
                  <span
                    onClick={() =>
                      dispatch(
                        decrementQuantity({
                          _id: item._id,
                          title: item.title,
                          image: item.image,
                          price: item.isNew ? item.price : item.oldPrice,
                          quantity: 1,
                          description: item.des,
                        })
                      )
                    }
                    className="border h5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-500 hover:text-white cursor-pointer duration-300 active:bg-black"
                  >
                    -
                  </span>
                  {item.quantity}
                  <span
                    onClick={() =>
                      dispatch(
                        increamentQuantity({
                          _id: item._id,
                          title: item.title,
                          image: item.image,
                          price: item.isNew ? item.price : item.oldPrice,
                          quantity: 1,
                          description: item.des,
                        })
                      )
                    }
                    className="border h5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-500 hover:text-white cursor-pointer duration-300 active:bg-black"
                  >
                    +
                  </span>
                </div>
              </div>
              <p className="w-14">${(item.quantity * checkPrice).toFixed(2)}</p>
            </div>
          );
        })}
      </div>
      <button
        onClick={() =>
          dispatch(resetCart()) & toast.error("Your Cart is Empty!")
        }
        className="bg-red-500 text-white mt-5 ml-7 py-1 px-6 hover:bg-red-800 duration-300  active:bg-white active:text-black"
      >
        Reset Cart
      </button>
      <Link to="/">
        <button className="mt-5 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300 active:text-red-500">
          <span>
            <HiOutlineArrowLeft />
          </span>
          Go shopping
        </button>
      </Link>
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

export default CartItem;
