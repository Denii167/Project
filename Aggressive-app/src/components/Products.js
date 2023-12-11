import React from "react";
import ProductsCard from "./ProductsCard";

const Products = ({ products }) => {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
          Shopping everyday
        </h1>
        <span className="w-20 h-[3px] bg-black"></span>
        <p className="max-w-[700px] text-gray-500 text-center">
          Our store aims to offer the best products available on the market for
          our customers who seek quality and style combined with the best
          technology has to offer for the practice of Aggressive inline. We have
          products for those who are just entering the sport and also for
          high-performance professional athletes. We believe that every detail
          makes a big difference. Always look for the best! Always count on the
          Aggressive AppStore!
        </p>
      </div>
      <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-3 gap-10">
        {products.map((item) => (
          <ProductsCard key={item._id} product={item}/>
        ))}
      </div>
    </div>
  );
};

export default Products;
