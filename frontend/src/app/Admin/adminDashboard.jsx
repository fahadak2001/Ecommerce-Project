import axios from "axios";
import React, { useState } from "react";

import FileBase from "react-file-base64";

function AdminDasboard() {

    const [users, setUsers] = useState([]);
    const [clickUsers, setClickUsers] = useState(false);

    const [products, setProducts] = useState([]);
    const [clickProducts, setClickProducts] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);

    const [image, setImage] = useState("");

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
        images: "",
    });



    async function getallusers() {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/admin/login/sucess/users", { withCredentials: true });
            setUsers(res.data.allUsers)
            console.log(users);
        }
        catch (error) {
            console.log("error while listing users:", error);
        }
        setClickProducts(false)
        setClickUsers(true);
    }


    async function onDelete(id) {
        console.log(id)
        const res = await axios.post("http://localhost:5000/api/v1/admin/login/sucess/users/delete", { id }); //here
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        console.log(res.data);
    }


    async function getallproducts() {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/product/all");
            setProducts(res.data.products)
            console.log(products);
        }
        catch (error) {
            console.log("error while listing products:", error);
        }
        setClickUsers(false);
        setClickProducts(true);
    }


    async function onDeleteProduct(id) {
        console.log(id)
        const res = await axios.post("http://localhost:5000/api/v1/product/delete", { id }); //here
        setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
        console.log(res.data);
    }




    function addProduct() {
        console.log("b")
        setShowAddProduct(true);
    }


    function changeHandler(e) {
        const { name, value } = e.target;
        const valueToSet = ["price", "discountPercentage", "rating", "stock"].includes(name) ? parseFloat(value) : value;
        setProductData((prevData) => ({
            ...prevData,
            [name]: valueToSet,
        }));
    }

    async function handleImage(e) {
        console.log(productData)
        e.preventDefault();

        const imagearray = [image.length];

        for (var i = 0; i < image.length; i++) {
            imagearray.push(image[i].base64)
        }

        setProductData(prevData => ({
            ...prevData,
            images: imagearray
        }));

        console.log(productData);
        const res = await axios.post("http://localhost:5000/api/v1/product/create", productData);
        console.log(res);
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
                <form onSubmit={(handleImage)}>
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
                            <label for="category" class="block mb-2 text-sm font-medium dark:text-gray-900">Category</label>
                            <input type="text" name="category" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category" required onChange={(e) => { changeHandler(e) }} />
                        </div>
                        <div>
                            <label for="category" class="block mb-2 text-sm font-medium dark:text-gray-900">Stock</label>
                            <input type="number" name="stock" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category" required onChange={(e) => { changeHandler(e) }} />
                        </div>
                    </div>
                    <div class="mb-6">
                        <label for="description" class="block mb-2 text-sm font-medium dark:text-gray-900">Description</label>
                        <input type="text" name="description" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-40 w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required onChange={(e) => { changeHandler(e) }} />
                    </div>
                    <div class="mb-6">
                        <label for="imageLink" class="block mb-2 text-sm font-medium dark:text-gray-900">Add Image</label>
                        <FileBase

                            type="file"
                            multiple={true}
                            onDone={(base64) => setImage(base64)}
                            required

                        />
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>


            </div>
        )
    }


    function sideBar() {
        return (
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <div class="mb-2 p-4">
                    <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Admin Dashboard</h5>
                </div>
                <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                    <div onClick={getallusers} role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <div class="grid place-items-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5">
                                <path fill-rule="evenodd" d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        Users
                    </div>
                    <div onClick={getallproducts} role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <div class="grid place-items-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5">
                                <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd"></path>
                            </svg>
                        </div>Products
                    </div>
                    <div role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <div class="grid place-items-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5">
                                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd"></path>
                            </svg>
                        </div>Profile
                    </div>
                    <div role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <div class="grid place-items-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5">
                                <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd"></path>
                            </svg>
                        </div>Settings
                    </div>
                    <div role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <div class="grid place-items-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5">
                                <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z" clip-rule="evenodd"></path>
                            </svg>
                        </div>Log Out
                    </div>
                </nav>
            </div>
        )
    }

    function getusers() {
        return (
            <div className="max-w-3xl  mx-auto bg-white shadow-md rounded-md overflow-y-auto relative mt-20 mb-20" style={{ maxHeight: '500px' }}>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 focus:outline-none"
                                            onClick={() => onDelete(user._id)}
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
        );
    }


    if (clickUsers) {
        return (
            <div className="flex min-h-screen">
                {sideBar()}
                {getusers()}
            </div>
        )
    }


    function productFeatures() {
        return (
            <div className="relative mt-20 mb-20" >
                <button
                    className="px-3 py-1 bg-green-400 text-white text-xs font-semibold rounded hover:bg-green-700 focus:outline-none"
                    onClick={addProduct}
                >
                    Add Product
                </button>
            </div>
        )
    }


    function getProducts() {
        return (
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
        );
    }

    if (clickProducts) {
        return (
            <div className="flex min-h-screen">
                {sideBar()}
                {productFeatures()}
                {getProducts()}
            </div>
        )
    }

    return (
        <div className="flex min-h-screen">
            {sideBar()}
        </div>
    )
}

export default AdminDasboard;