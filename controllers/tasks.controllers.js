const { User } = require('../models/users.model')
const { Task } = require('../models/tasks.model')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'userId', 'title', 'limitDate', 'startDate', 'finishDate'],
            include: [{ model: User, attributes: ['id', 'name', 'email', 'status'] }]
        })

        res.status(200).json({
            status: 'success',
            data: { tasks }
        })
    } catch (error) {
        console.log(error)
    }
}

const getTasks = async (req, res) => {
    try {
        const { status } = req.params;
        const tasks = await Task.findAll({
            where: { status },
        });
        res.status(200).json({
            status: "success",
            data: {
                tasks,
            },
        });
    } catch (error) {
        console.log(error);
    }
}

const createTask = async (req, res) => {
    try {
        const { title, userId, startDate, limitDate } = req.body

        const newTask = await Task.create({ title, userId, startDate, limitDate })

        res.status(201).json({
            status: 'success',
            data: { newTask }
        })
    } catch (error) {
        console.log(error);
    }
}

const updateTast = async (req, res) => {
    try {
        const { finishDate } = req.body
        const { task } = req

        const newTask = await task.update({ finishDate })

        const limit = Date.parse(task.limitDate)
        const time = Date.parse(finishDate)

        const timedDifferent = limit - time

        if (timedDifferent >= 0) {
            await task.update({ finishDate, status: 'completed' })
        } else if (timedDifferent < 0) {
            await task.update({ finishDate, status: 'late' })
        }

        res.status(200).json({
            status: 'success',
            data: { newTask }
        })

        res.status(400).json({
            status: 'error',
            task
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (req, res) => {
    try {
        const { task } = req

        await task.update({ status: 'cancelled' })

        res.status(204).json({ status: 'success' })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllTasks,
    getTasks,
    createTask,
    updateTast,
    deleteTask
}