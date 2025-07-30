import Products from "./models/ProductSchema.js";
import productJSON from "./constant/productJSON.js";

const DefaultData = async () => {
    try {
        await Products.deleteMany({})

        const storeData = await Products.insertMany(productJSON)
    } catch (error) {
        console.log("error", error.message)
    }
}

export default DefaultData