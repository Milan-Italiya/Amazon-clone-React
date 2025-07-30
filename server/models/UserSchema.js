import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secret_key = process.env.SECRET_KEY
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    phno: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    repassword: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    carts: Array
})

// hash password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.repassword = await bcrypt.hash(this.repassword, 12)
    }
    next()
})

// token generate
userSchema.methods.generateAuthToken = async function () {
    try {
        let generateToken = jwt.sign({ _id: this._id }, secret_key,{
            expiresIn:'15m'
        })
        this.tokens = this.tokens.concat({ token: generateToken })
        await this.save()
        return generateToken;
    } catch (error) {
        console.log(error.message)
    }
}

// Add to cart

userSchema.methods.addCartData = async function (cart) {
    try {
        this.carts = this.carts.concat(cart)
        await this.save()
        return this.carts
    } catch (error) {
        console.log(error.message);
    }
}


const User = new mongoose.model('users', userSchema)


export default User