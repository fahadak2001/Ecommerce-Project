const axios = require("axios");

console.log("Insert script is running");

async function getProducts() {
  try {
    console.log("Fetching products...");
    const response = await axios.get(
      "https://dummyjson.com/products/category/groceries"
    );
    const myProducts = response.data.products;
    console.log("Products fetched:", myProducts);
    await mapAndPostProducts(myProducts);
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response ? error.response.data : error.message
    );
  }
}

async function mapAndPostProducts(myProducts) {
  for (const mappedProduct of myProducts) {
    const product = {
      title: mappedProduct.title || "",
      description: mappedProduct.description || "",
      price: `${mappedProduct.price || ""}`,
      discountPercentage: `${mappedProduct.discountPercentage || ""}`,
      rating: `${mappedProduct.rating || ""}`,
      stock: `${mappedProduct.stock || ""}`,
      brand: "Unknown", // Example: Provide a default value
      category: mappedProduct.category || "",
      thumbnail: mappedProduct.thumbnail || "",
      images: mappedProduct.images || "",
    };

    try {
      console.log("Posting product:", product);
      const response = await axios.post(
        "http://localhost:5000/api/v1/product/create",
        product
      );
      console.log("Product created:", response.data);
    } catch (err) {
      console.error(
        "Error posting product:",
        err.response ? err.response.data : err.message
      );
    }
  }
}

getProducts();
