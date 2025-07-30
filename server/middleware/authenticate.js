import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
const secret_key = process.env.SECRET_KEY

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.Amazonclone;

        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const verifyToken = jwt.verify(token, secret_key);
        const rootUser = await User.findOne({
            _id: verifyToken._id,
            "tokens.token": token
        });

        if (!rootUser) {
            console.log("No matching user found");
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    } catch (error) {
        console.log("Auth error:", error.message);
        return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }
};



export default authenticate