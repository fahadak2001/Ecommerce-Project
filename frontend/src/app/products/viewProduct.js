import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function ViewProduct({ triggereffect }) {
  const { productId } = useParams();
  const [product, setProduct] = useState({ images: [] });

  const swiperRef = useRef(null);

  async function getProduct() {
    const res = await axios.post(
      `http://localhost:5000/api/v1/product/find/${productId}`
    );
    setProduct(res.data.foundProduct);
  }

  console.log(product);

  useEffect(() => {
    getProduct();
  }, []);

  async function addtoCart() {
    const productID = productId;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/order/create",
        { productID },
        {
          withCredentials: true,
        }
      );
      triggereffect();
    } catch (error) {
      window.alert("login please, Token might expired please login agian");
    }
  }

  const goToNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div>
      <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <div
                onClick={() => {
                  goToNextSlide();
                }}
              >
                <Swiper
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                >
                  {product.images.map((mappedImage, index) => (
                    <SwiperSlide key={index}>
                      <img
                        class="hidden dark:block h-[448px] w-[448px] object-contain"
                        src={mappedImage}
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div class="mt-6 sm:mt-8 lg:mt-0">
              <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">
                {product.title}
              </h1>
              <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  {product.price}
                </p>

                <div class="flex items-center gap-2 mt-2 sm:mt-0">
                  <p class="text-sm font-medium leading-none text-gray-800 dark:text-gray-800">
                    Rating: {product.rating}
                  </p>
                  <p class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-black">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>

              <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  onClick={() => {
                    addtoCart();
                  }}
                  href="#"
                  title=""
                  class="text-black mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                  role="button"
                >
                  <svg
                    class="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add to cart
                </a>
              </div>

              <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p class="mb-6 text-gray-500 dark:text-gray-800">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewProduct;
