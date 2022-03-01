import express from 'express'

import ShortnerController from '../controller/ShortnerController.js'

const shortnerController = new ShortnerController()

const router = express.Router()

//metodo get all
router.get('/api/shortner/:id', shortnerController.getOne)


//metodo get by id
router.get("/api/shortner/", shortnerController.index);

//metodo post by id
router.post("/api/shortner", shortnerController.store);


//metodo update by id
router.put('/api/shortner/:id', shortnerController.update)


//metodo delete by id
router.delete('/api/shortner/:id', shortnerController.remove);

export default router