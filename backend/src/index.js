import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

import UserRouter from "./router/UserRoutes.js"
import ShortnerRouter from "./router/ShortnerRoutes.js"
import { AuthMiddleware } from './middlewares/auth.middleware.js'


const DATABASE_URL = process.env.DATABASE_URL
const port = process.env.PORT

mongoose.connect(DATABASE_URL)
    .then(() => console.log("data base conected..."))
    .catch((error) => console.log(error))
const app = express()

app.use(express.json())

//meddleware...
app.use(morgan("dev"))

app.use(AuthMiddleware)

app.use(UserRouter)
app.use(ShortnerRouter)


app.listen(port, () => console.log(`Servidor ativo na porta ${port}`))