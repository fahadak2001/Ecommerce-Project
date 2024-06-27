import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductComponent({ triggereffect }) {
  const [allProducts, setAllProducts] = useState([]);
  const [currentproducts, setCurrentProducts] = useState([]);
  const [productName, setProductName] = useState("All Products");
  const [range, setRange] = useState("50000");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/product/all"
      );
      setAllProducts(response.data.data);
      setCurrentProducts(response.data.data);
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

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }

  function clickHandler(e) {
    const name = e.target.name;
    const fetchedproducts = allProducts.filter(
      (myProducts) => myProducts.category === name
    );
    setCurrentProducts(fetchedproducts);
    setProductName(name);
  }

  function allProductClickHandler(e) {
    setCurrentProducts(allProducts);
    setProductName(e.target.name);
  }

  function handleRange(e) {
    setRange(e.target.value);
  }

  function filterProducts() {
    if (productName == "All Products") {
      const fetchedproducts = allProducts.filter(
        (myProducts) => myProducts.price < range
      );
      setCurrentProducts(fetchedproducts);
    } else {
      const fetchedproducts = allProducts.filter(
        (myProducts) =>
          myProducts.price < range && myProducts.category === productName
      );
      setCurrentProducts(fetchedproducts);
    }
  }

  function low() {
    const sortedProducts = [...currentproducts].sort(
      (a, b) => a.price - b.price
    );
    setCurrentProducts(sortedProducts);
  }

  function high() {
    const sortedProducts = [...currentproducts].sort(
      (a, b) => b.price - a.price
    );
    setCurrentProducts(sortedProducts);
  }

  function handleSortDrop(e) {
    const value = e.target.value;
    if (value === "low") {
      low();
    } else if (value === "high") {
      high();
    }
  }

  const Sidebar = () => {
    return (
      <div className="w-64 bg-gray-200 text-black p-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <ul>
          <li className="mb-2">
            <a
              name="All Products"
              href="#section1"
              className="text-black-300 hover:text-black"
              onClick={(e) => allProductClickHandler(e)}
            >
              All Products
            </a>
          </li>
          <li className="mb-2">
            <a
              name="smartphones"
              href="#section2"
              className="text-black-300 hover:text-black"
              onClick={(e) => clickHandler(e)}
            >
              Phones
            </a>
          </li>
          <li className="mb-2">
            <a
              name="laptops"
              href="#section3"
              className="text-black-300 hover:text-black"
              onClick={(e) => clickHandler(e)}
            >
              Laptops
            </a>
          </li>
          <li className="mb-2">
            <a
              name="fragrances"
              href="#section4"
              className="text-black-300 hover:text-black"
              onClick={(e) => clickHandler(e)}
            >
              Fragnaces
            </a>
          </li>
          <li className="mb-2">
            <a
              name="home-decoration"
              href="#section4"
              className="text-black-300 hover:text-black"
              onClick={(e) => clickHandler(e)}
            >
              Decorations
            </a>
          </li>
          <li className="mb-2">
            <a
              name="groceries"
              href="#section4"
              className="text-black-300 hover:text-black"
              onClick={(e) => clickHandler(e)}
            >
              Groceries
            </a>
          </li>
        </ul>
        <div className="text-black">
          <div>
            <h6>Max Price:{range}</h6>
          </div>
          50$
          <input
            type="range"
            range={range}
            min="50"
            max="3000"
            step="100"
            onChange={handleRange}
          />
          3000$
        </div>
        <button onClick={filterProducts}>Go</button>
      </div>
    );
  };

  const getallproducts = () => {
    return (
      <div className="flex-1 p-4">
        <div>
          <h3>{productName}</h3>
        </div>
        <div className="h-5 relative w-[130px] ml-auto bg-gray-50">
          <select
            onChange={(e) => {
              handleSortDrop(e);
            }}
            class="bg-gray-50"
          >
            <option selected disabled>
              Sort
            </option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
        <p className="text-xl font-bold mb-4">{}</p>
        <div className="flex flex-wrap justify-center mt-3 mb-3">
          {currentproducts.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3"
            >
              <div className="bg-white shadow-lg flex flex-col h-full">
                <div className="flex-none">
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="w-full object-cover h-48 mb-2"
                  />
                </div>

                <div className="flex-auto p-4">
                  <h2 className="text-base h-10 font-semibold mb-1">
                    {product.title}
                  </h2>
                  <p className="mb-2 h-18 overflow-hidden">
                    {truncateText(product.description, 35)}
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <h4 className="text-sm font-semibold">
                      Price: ${product.price}
                    </h4>
                  </div>
                  <button
                    onClick={() => addToProduct(product._id)}
                    type="button"
                    className="btn btn-primary mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProducts = () => {
    return (
      <div className="flex min-h-screen">
        {Sidebar()}
        {getallproducts()}
      </div>
    );
  };

  return <div>{renderProducts()}</div>;
}

export default ProductComponent;
