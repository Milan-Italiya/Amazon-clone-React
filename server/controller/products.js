import Products from "../models/ProductSchema.js"
import User from "../models/UserSchema.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find({})
        console.log(products);
        res.status(201).json({ status: 201, products })
    } catch (error) {
        res.status(404).json({ status: 404, error: error.message })
    }
}

export const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);

        const productDetails = await Products.findOne({ id: id })
        res.status(201).json({ status: 201, productDetails })
    } catch (error) {
        res.status(201).json({ status: 404, error: error.message })
        console.log("Error: ", error.message)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        req.rootUser.carts = req.rootUser.carts.filter((curval) => {
            return curval.id != id
        })
        req.rootUser.save()
        res.status(201).json(req.rootUser)
        console.log('item removed');
    } catch (error) {
        res.status(404).json("error",error)

    }
}

