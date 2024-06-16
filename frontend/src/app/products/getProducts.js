import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProductComponent({ triggereffect }) {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/product/all"
      );
      setAllProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function addToProduct(productID) {
    const res = await axios.post(
      "http://localhost:5000/api/v1/order/create",
      { productID },
      {
        withCredentials: true,
      }
    );
    triggereffect();
    console.log(res);
  }

  const renderProducts = () => {
    return (
      <div className="flex flex-wrap justify-center">
        {allProducts.map((product) => (
          <div
            key={product._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
          >
            <div className="bg-white shadow-lg flex flex-col h-full">
              <div className="flex-none">
                <img
                  src={product.thumbnail}
                  alt=""
                  className="w-full object-cover h-64 mb-4"
                />
              </div>
              <div className="flex-auto p-6">
                <h3 className="text-xl font-bold mb-2">{product.category}</h3>
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="mb-4">{product.description}</p>
                <footer className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">${product.price}</h4>
                  <h4>{product.discountPercentage}</h4>
                </footer>
              </div>
              <button
                onClick={() => addToProduct(product._id)}
                type="button"
                className="btn btn-primary mt-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderProducts()}</div>;
}

export default ProductComponent;
