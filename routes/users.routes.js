const express = require('express')

const {
    createUser,
    deleteUser,
    getAllUsers,
    updateUser
} = require('../controllers/users.controllers')

const { userExists } = require('../middlewares/users.middlewares')
const { createUserValidators } = require('../middlewares/validators.middleware')

const userRoutes = express.Router()

userRoutes.get('/', getAllUsers)
userRoutes.post('/', createUserValidators, createUser)
userRoutes.patch('/:id', userExists, updateUser)
userRoutes.delete('/:id', userExists, deleteUser)

module.exports = { userRoutes }