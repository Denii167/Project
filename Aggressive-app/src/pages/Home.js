import React, { useState } from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";

// Import productList directly from the file
import { prodList } from "../Data";

const Home = () => {
  // Initialize products state with productList
  const [products] = useState(prodList);

  return (
    <div className="font-normFont">
      <Banner />
      {/* Pass products to the Products component */}
      <Products products={products} />
    </div>
  );
};

export default Home;
