import axios from "axios";
import { useEffect, useState } from "react";

function GetAllOrders({ triggereffect }) {
  const [products, setProducts] = useState([]);
  const [del, setdelete] = useState(false);
  console.log(products);
  async function removeOrder(orderID) {
    setdelete(false);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/order/delete/order",
        { orderID }
      );
      setdelete(true);
      triggereffect();
    } catch (error) {
      console.log(error);
    }
  }

  async function getOrders() {
    const getOrders = await axios.get(
      "http://localhost:5000/api/v1/order/userid",
      { withCredentials: true }
    );
    setProducts(getOrders.data.foundOrders);
  }

  useEffect(() => {
    getOrders();
  }, [del]);

  let Subtotal = products.reduce((previousValue, currentProduct) => {
    return previousValue + currentProduct.price;
  }, 0);

  const Shipping = 10;
  // const Total = 0;

  let Total = products.reduce((previousValue, currentProduct) => {
    return previousValue + currentProduct.price + 10;
  }, 0);

  const renderProducts = () => {
    return (
      <div className="h-full bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="md:w-2/3">
            {products.map((product, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <img
                  src={product.image[0]}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {product.title}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">{}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">{product.price} ₭</p>
                      <svg
                        onClick={() => {
                          removeOrder(product._id);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">{Subtotal}</p>
              <p className="text-gray-700"></p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">{Shipping}</p>
              <p className="text-gray-700"></p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">{Total}</p>
              <div>
                <p className="mb-1 text-lg font-bold">USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
    );
  };

  return <div>{renderProducts()}</div>;
}

export default GetAllOrders;
