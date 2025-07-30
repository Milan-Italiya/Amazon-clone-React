import express from 'express'
import { deleteProduct, getProductDetails, getProducts } from '../controller/products.js'
import { addDataToCart, getCarts, getValidateUser, login, logout, register } from '../controller/users.js'
import authenticate from '../middleware/authenticate.js'

const app = express.Router()

// product
app.get('/getproducts', getProducts)
app.get('/getproducts/:id', getProductDetails)
app.delete('/remove/:id', authenticate, deleteProduct)


// user
app.post('/register', register)
app.post('/login', login)
app.post('/addcart/:id', authenticate, addDataToCart)
app.get('/cartdetails', authenticate, getCarts)
app.get('/validateuser', authenticate, getValidateUser)
app.get('/logout', authenticate, logout);

export default app