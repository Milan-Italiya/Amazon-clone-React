import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";
import Products from '../models/ProductSchema.js'

export const register = async (req, res) => {
    const { name, email, phno, password, repassword } = req.body

    if (!name || !email || !phno || !password || !repassword) {
        return res.status(404).json({ error: "Please filled the all details." })
        console.log("no data available");
    }

    try {
        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(404).json({ error: "User already exists." })
        } else if (password !== repassword) {
            return res.status(404).json({ error: "Password and Re-password not matched." })
        }

        const newUser = new User({
            name,
            email,
            phno,
            password,
            repassword
        })

        const storeData = await newUser.save()
        console.log(storeData);
        res.status(201).json({ status: 201, storeData })
    } catch (error) {
        res.status(404).json({ error: error.message })
        console.log(error.message)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill all fields.' });
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = await user.generateAuthToken();
        console.log(token);


        res.cookie('Amazonclone', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error('Login Error:', error.message);
        return res.status(500).json({ error: 'Server error.' });
    }
};

export const addDataToCart = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Products.findOne({ id });
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized user.' });
        }

        user.carts.push(product);
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.error('Add to cart error:', error.message);
        res.status(500).json({ error: 'Server error.' });
    }
};

export const getCarts = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.userId });
        console.log(user)
        if (!user) return res.status(404).json({ error: 'Unauthorized user.' });

        res.status(200).json({ carts: user.carts });
    } catch (error) {
        console.log('Get cart error:', error.message);
        res.status(404).json({ error: 'Server error.' });
    }
};
export const getValidateUser = async (req, res) => {
    try {
        const ValidUser = await User.findOne({ _id: req.userId });
        res.status(201).json(ValidUser)
    } catch (error) {
        console.log('Error', error)
        res.status(400).json(error)
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("Amazonclone", { path: "/" });
        req.rootUser.tokens = req.rootUser.tokens.filter(
            (currentElement) => currentElement.token !== req.token
        );

        await req.rootUser.save();
        res.status(201).json({ message: "User logged out" });
    } catch (error) {
        res.status(500).json({ error: "Logout failed", details: error.message });
    }
};
