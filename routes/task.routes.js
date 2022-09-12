const express = require('express')

const {
    getAllTasks,
    getTasks,
    createTask,
    updateTast,
    deleteTask
} = require('../controllers/tasks.controllers')

const { taskExists } = require('../middlewares/tasks.middlewares')
const { tasksStatus } = require('../middlewares/tasks.middlewares')
const { createTaskValidators } = require('../middlewares/validators.middleware')

const tasksRoutes = express.Router()

tasksRoutes.get('/', getAllTasks)
tasksRoutes.get('/:status', tasksStatus, getTasks)
tasksRoutes.post('/', createTaskValidators, createTask)
tasksRoutes.patch('/:id', taskExists, updateTast)
tasksRoutes.delete('/:id', taskExists, deleteTask)

module.exports = { tasksRoutes }