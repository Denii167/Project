import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/bazarSlice";
import { ToastContainer, toast } from "react-toastify";

const ProductsCard = ({ product }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = product.title;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };

  return (
    <div className="group relative">
      <div
        onClick={() => handleDetails(product)}
        className="w-full h-96 cursor-pointer overflow-hidden border-[1px] "
      >
        <img
          src={product.image}
          className="w-full h-full object-cover group-hover:scale-110 duration-500"
          alt="product.title"
        />
      </div>

      <div
        className="w-full h-[90px] border-[1px] px-2 py-4 mt-[-15] product-details-box"
        alt="product-details-box"
        onMouseEnter={() => setHoveredProduct(product)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        <div className="flex justify-between items-center ">
          <div>
            <h2 className="text-base font-bold">
              {product.title.substring(0, 15)}
            </h2>
          </div>
          <div>
            <p>{product.category}</p>
          </div>
          <div className="flex justify-end gap-2 relative overflow-hidden w-28 text-sm">
            <div
              className={`flex gap-2 py-4 transform ${
                hoveredProduct === product ? "translate-x-80" : "translate-x-10"
              } transition-transform duration-500`}
            >
              {product.isNew ? (
                <>
                  <p className="line-through text-gray-500">
                    ${product.oldPrice}
                  </p>
                  <p className="font-semibold">${product.price}</p>
                </>
              ) : (
                <p className=" text-gray-500">${product.oldPrice}</p>
              )}
            </div>
            <div
              className={`add-to-cart ${
                hoveredProduct === product ? "translate-x-0" : "-translate-x-32"
              } transition-transform duration-500`}
            >
              <p
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: product._id,
                      title: product.title,
                      image: product.image,
                      price: product.price,
                      quantity: 1,
                      description: product.des,
                    })
                  ) & toast.success(`${product.title} was added`)
                }
                className="text-gray-500 text-base font-bold hover:text-red-700 active:text-black flex items-center gap-1 cursor-pointer"
              >
                Add to cart{" "}
                <span>
                  <BsArrowRight />
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-0">
          {product.isNew && (
            <p className="bg-black text-white font-semibold px-6 py-1">Sale</p>
          )}
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

export default ProductsCard;
