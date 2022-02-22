const express = require('express')

const UserRouter = require("./router/UserRoutes")


const app = express()
const port = 4000

app.use(express.json())

app.use(UserRouter)

app.listen(port, () => console.log(`Servidor ativo na porta ${port}`))