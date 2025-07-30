import express from 'express'
import dotenv from 'dotenv'
import './DB/conn.js'
import Products from './models/ProductSchema.js'
import DefaultData from './defaultData.js'
import cors from 'cors'
import router from './Routes/route.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(router)


const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Server successfully started')
})

app.listen(port, () => {
    console.log(`🚀 Server running at port ${port} 🚀`)
})

DefaultData()