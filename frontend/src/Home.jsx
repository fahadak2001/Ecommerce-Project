import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";

const eccommerce = require("./icons/eccommerce.jpg");



function Home() {


    const [product, setProduct] = useState({ images: [] });
    const swiperRef = useRef(null);

    async function getProduct() {
        var productId = "667e5ff38dc7e4f445e32892";
        const res = await axios.post(
            `http://localhost:5000/api/v1/product/find/${productId}`
        );
        setProduct(res.data.foundProduct);
    }

    const goToNextSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };


    useEffect(() => { getProduct() }, [])

    return (
        <div>
            <div className="flex min-h-screen bg-gray-200 w-11/12 ml-12 rounded-md">

                <img className="rounded-lg w-1/2 h-1/3 object-fill" src={eccommerce} alt="eccommerce Image" />

                <div
                    onClick={goToNextSlide}
                    className="cursor-pointer  rounded-md mt-28  w-1/2 h-1/2"
                >
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        // navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000 }}
                        modules={[Navigation, Pagination, Autoplay]}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {product.images.map((mappedImage, index) => (
                            <SwiperSlide key={index} className="flex justify-center items-center">
                                <img
                                    class="hidden m-auto dark:block h-1/2 w-1/2 object-contain"
                                    src={mappedImage}
                                    alt=""
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
            <div class="bg-white">
                <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div class="group relative">
                            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                            </div>
                            <div class="mt-4 flex justify-between">
                                <div>
                                    <h3 class="text-sm text-gray-700">
                                        <a href="#">
                                            <span aria-hidden="true" class="absolute inset-0"></span>
                                            Basic Tee
                                        </a>
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-500">Black</p>
                                </div>
                                <p class="text-sm font-medium text-gray-900">$35</p>
                            </div>
                        </div>
                        <div class="group relative">
                            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                            </div>
                            <div class="mt-4 flex justify-between">
                                <div>
                                    <h3 class="text-sm text-gray-700">
                                        <a href="#">
                                            <span aria-hidden="true" class="absolute inset-0"></span>
                                            Basic Tee
                                        </a>
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-500">Black</p>
                                </div>
                                <p class="text-sm font-medium text-gray-900">$35</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;