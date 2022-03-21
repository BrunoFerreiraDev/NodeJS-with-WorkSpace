/* eslint-disable class-methods-use-this */
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import dotenv from 'dotenv';
import UserModel from '../model/UserModel.js';

dotenv.config();

const { JWT_SECRET } = process.env;

const hashPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);

  return hash;
};

class UserController {
  // get
  async getOne(request, response) {
    const { id } = request.params;

    try {
      const user = await UserModel.findById(id);

      if (user) {
        return response.send(user);
      }

      response.status(404).send({ message: 'User not found' });
    } catch (error) {
      console.log('Create User Error:', error.message);
      response.status(400).send({ message: 'An unexpected error happended' });
    }
  }

  async index(request, response) {
    const users = await UserModel.find();
    response.send(users);
  }

  // login
  async login(request, response) {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email }).lean();// o lean() tira tudo que não for o objeto com os dados do user

    console.log(user.password);
    console.log('password', password);

    if (!user) {
      return response.status(404).json({ messege: 'User not found' });
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      return response.status(404).json({ message: 'Password Invalid' });
    }
    const token = jsonwebtoken.sign({
      id: user._id,
      name: user.name,
      email: user.email,
    }, JWT_SECRET, { expiresIn: 86400 });// assina o token, 86400 segundos, equivalnte a 24horas

    return response.json({ token });
  }

  // update
  async update(request, response) {
    const { id } = request.params;
    const {
      name, phones, email, password, birthDate, state,
    } = request.body;

    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        name, phones, email, password, birthDate, state,
      },
      { new: true },
    );

    return response.send(user);
  }

  // delete
  async remove(request, response) {
    const { id } = request.params;

    const user = await UserModel.findById(id);

    if (user) {
      user.remove();// apaga o user em questão do banco
      return response.status.send({ message: 'User Removed' });
    }
    response.status(404).send({ messege: 'user not found' });
  }

  // post
  async store(request, response) {
    const {
      name, phones, email, password, birthDate, state,
    } = request.body;

    try {
      const user = await UserModel.create({
        name,
        phones,
        email,
        password: hashPassword(password),
        birthDate,
        state,
      })
        .then((data) => console.log('data do store', data))
        .catch((error) => console.log(error));

      return response.send({ message: 'User Crieted!', user });
    } catch (error) {
      return response.status(400).json({ message: 'An unexpected error happened' });
    }
  }
}

export default UserController;
