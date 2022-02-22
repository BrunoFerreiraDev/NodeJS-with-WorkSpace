const users = require('../model/UserModel')
const crypto = require('crypto')

const Controller = {

    //get
    getOne(request, response) {
        const { id } = request?.params;
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return response.status(404).send({
                message: 'User not found'
            });
        }

        return response.send({
            data: users[userIndex]
        });
    },

    index(request, response) {
        response.json({ messege: "index" })
    },


    //update
    update(request, response) {
        const { id } = request.params;
        let { name, city } = request.body;

        const userIndex = users.findIndex(user => user.id === id)

        if (userIndex === -1) {
            return response.status(404).send({
                message: 'User not found'
            });
        }

        if (typeof name === 'string') {
            users[userIndex].name = name;
        }

        if (typeof city === 'string') {
            users[userIndex].city = city;
        }

        return response.status(200).send({
            message: 'Resource updated successfully',
            data: users[userIndex]
        });
    },



    //delete
    remove(request, response) {
        const { id } = request.params;
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return response.status(404).send({
                message: 'User not found'
            });
        }
        users.splice(userIndex, 1);
        return response.status(200).send({
            message: 'User deleted'
        });
    },


    //post
    store(request, response) {
        const { name, city } = request.body;

        if (typeof name !== 'string' || typeof city !== 'string') {
            return response.send({
                message: "Invalid params"
            })
        }

        const user = {
            id: crypto.randomUUID(),
            name,
            city,
        };
        users.push(user);
        return response.send({
            message: "Usuário criado!",
            data: user
        });
    },
}

module.exports = Controller