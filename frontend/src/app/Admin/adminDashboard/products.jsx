
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/features/productSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import LoaderComponent from "./../../loader/loader.jsx"
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";

function Product() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        title: "",
        description: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock: "",
        brand: "",
        category: "",
        thumbnail: "",
    });

    const [clickProducts, setClickProducts] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);

    const [image, setImage] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('category');
    const [loading, setLoading] = useState(false);

    const products = useSelector((state) => state.products.items);
    const productStatus = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);




    function getallproducts() {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        };
    }

    useEffect(() => { getallproducts() }, [])


    function changeHandler(e) {
        const { name, value } = e.target;
        if (name == "category") {
            setSelectedCategory(value);
            setProductData((prevData) => ({
                ...prevData,
                [name]: valueToSet,
            }));
        }
        const valueToSet = ["price", "discountPercentage", "rating", "stock"].includes(name) ? parseFloat(value) : value;
        setProductData((prevData) => ({
            ...prevData,
            [name]: valueToSet,
        }));

    }

    function handleImage(e) {
        console.log(e);
        setImage(e.target.files);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("image", image)
        const formData = new FormData();
        // for (const key in productData) {
        //     formData.append(key, productData[key]);
        // }
        formData.append("title", productData.title)
        formData.append("description", productData.description)
        formData.append("price", productData.price)
        formData.append("rating", productData.rating)
        formData.append("stock", productData.stock)
        formData.append("brand", productData.brand)
        formData.append("category", productData.category)
        formData.append("thumbnail", productData.thumbnail)

        if (image) {
            Array.from(image).forEach(image => { formData.append("images", image) });
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/v1/product/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            console.log("Product created:", res);
            navigate(`/products/specific/${res.data.createdProduct._id}`)
        } catch (error) {
            console.error("Error creating product:", error);
        }

    }

    if (loading) {
        return (
            <LoaderComponent />
        )
    }

    async function onDeleteProduct(id) {
        console.log(id)
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/v1/product/delete", { id });
            dispatch(fetchProducts());
            setLoading(false);
        }
        catch (error) {

        }
    }


    function addProduct() {
        setShowAddProduct(true);
    }

    if (showAddProduct) {
        return (
            <div class="relative ml-20 mr-20 max-w-2xl mx-auto bg-transparent p-16" z-20>
                <button
                    className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 focus:outline-none"
                    onClick={() => { setShowAddProduct(false) }}
                >
                    close
                </button>
                <form onSubmit={(handleSubmit)}>
                    <div class="grid gap-6 mb-6 lg:grid-cols-2">
                        <div>
                            <label for="title" class="block mb-2 text-sm font-medium dark:text-gray-900">Title</label>
                            <input type="text" name="title" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title of the Product" required onChange={(e) => { changeHandler(e) }} />
                        </div>
                        <div>
                            <label for="price" class="block mb-2 text-sm font-medium dark:text-gray-900">Price</label>
                            <input type="number" name="price" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price of the Product" required onChange={(e) => { changeHandler(e) }} />
                        </div>
                        <div>
                            <label for="discountPercentage" class="block mb-2 text-sm font-medium dark:text-gray-900">Discount Percentage</label>
                            <input type="number" name="discountPercentage" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Discount Percentage" required onChange={(e) => { changeHandler(e) }} />
                        </div>
                        <div>
                            <label for="rating" class="block mb-2 text-sm font-medium dark:text-gray-900">Rating</label>
                            <input type="number" name="rating" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rating" required onChange={(e) => { changeHandler(e) }} />
                        </div>
                        <div>
                            <label for="brand" class="block mb-2 text-sm font-medium dark:text-gray-900">Brand</label>
                            <input type="text" name="brand" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Brand" required onChange={(e) => { changeHandler(e) }} />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium dark:text-gray-900">category</label>
                            <select
                                name="category"
                                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={selectedCategory}
                                onChange={(e) => { changeHandler(e) }}
                            >
                                <option value="">{selectedCategory}</option>
                                <option value="smartphones">Phones</option>
                                <option value="laptops">Laptops</option>
                                <option value="fragrances">Fragrances</option>
                                <option value="home-decoration">Decorations</option>
                                <option value="groceries">Groceries</option>
                            </select>
                        </div>
                        <div>
                            <label for="stock" class="block mb-2 text-sm font-medium dark:text-gray-900">Stock</label>
                            <input type="number" name="stock" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category" required onChange={(e) => { changeHandler(e) }} />
                        </div>
                    </div>
                    <div class="mb-6">
                        <label for="description" class="block mb-2 text-sm font-medium dark:text-gray-900">Description</label>
                        <input type="text" name="description" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-40 w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required onChange={(e) => { changeHandler(e) }} />
                    </div>
                    <div class="mb-6">
                        <label for="imageLink" class="block mb-2 text-sm font-medium dark:text-gray-900">Add Image</label>
                        <input onChange={handleImage} multiple type="file" />
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit and view</button>
                </form>


            </div>
        )
    }


    return (
        <div className="flex min-h-screen">
            <div className="relative mt-20 mb-20" >
                <button
                    className="px-3 py-1 bg-green-400 text-white text-xs font-semibold rounded hover:bg-green-700 focus:outline-none"
                    onClick={addProduct}
                >
                    Add Product
                </button>
            </div>
            <div className="max-w-3xl  mx-auto bg-white shadow-md rounded-md overflow-y-auto relative mt-20 mb-20 " style={{ maxHeight: '500px' }}>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((products, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{products.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{products.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{products.rating}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 focus:outline-none"
                                            onClick={() => onDeleteProduct(products._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );

}

export default Product;
