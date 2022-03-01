import express from 'express'

import UserController from '../controller/UserController.js'

const userController = new UserController()

const router = express.Router()

//metodo login
router.post('/api/login', userController.login)

//metodo get all
router.get('/api/users/:id', userController.getOne)


//metodo get by id
router.get("/api/users/", userController.index);

//metodo post by id
router.post("/api/users", userController.store);


//metodo update by id
router.put('/api/users/:id', userController.update)


//metodo delete by id
router.delete('/api/users/:id', userController.remove);

export default router