const express = require('express');

const UserController = require('../controller/UserController')

const router = express.Router()

//metodo get all
router.get('/api/user', (request, response) => {
    UserController.getOne()
})


//metodo get by id
router.get("/api/user/:id", (request, response) => {
    UserController.index()
});

//metodo post by id
router.post("/api/user", (request, response) => {
    UserController.store()
});


//metodo update by id
router.patch('/api/user/:id', (request, response) => {
    UserController.update()
})


//metodo delete by id
router.delete('/api/user/:id', (request, response) => {
    UserController.remove()
});

module.exports = router