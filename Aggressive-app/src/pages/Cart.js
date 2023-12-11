import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fishbrain } from "../assets";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const [totalAmt, setTotalAmt] = useState("");
  const [payNow, setPayNow] = useState(false);

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      const checkPrice = item.isNew ? item.price : item.oldPrice;
      price += checkPrice * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
  };

  const payment = async (token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: totalAmt * 100,
      token: token,
    });
  };

  return (
    <div>
      <img
        className="w-full h-[350px] ml-3 object-cover"
        src={fishbrain}
        alt="cartImg"
      />
      <div className="max-w-screen-xl mx-auto py-4 flex">
        <CartItem />
        <div className="w-2/5 bg-[#dfcfcf] py-4 px-4">
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-500  pb-3">
            <h2 className="text-2x1 font-medium ">Cart Total</h2>
            <p className=" font-normalFont flex items-start gap-3 text-base">
              Shipping: {""}
              <span>New Zealand, Auckland. 2050, Getulio's Vargas Avenue.</span>
            </p>
          </div>
          <p className="mt-2">
            Total:{" "}
            <span className="text-lg font-bold">
              $ {totalAmt} (Including GST)
            </span>
          </p>
          <div>
            <button
              onClick={handleCheckout}
              className="bg-black mt-3 text-white py-3 px-6 hover:bg-gray-800 active:bg-white active:text-black"
            >
              checkout
            </button>
            {payNow && (
              <div className="w-full mt-5 flex items-center justify-center">
                <StripeCheckout
                  stripeKey="pk_test_51O7qNeDmvdnt7PnfocovQ4aSJyxaDVMSEDSBjbZXiOLsVScxDkK6G9ITrd79P1auui3x2V3B5qNFffZPZF8ZE5JR00WKqOMuQs"
                  name="Aggressive AppStore"
                  amount={totalAmt * 100}
                  label="Pay to Aggressive"
                  description={`Your Payment amount is $${totalAmt}`}
                  token={payment}
                  email={userInfo.email}
                />
              </div>
            )}
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

export default Cart;
