const express = require('express')
const { tasksRoutes } = require('./routes/task.routes')
const { userRoutes } = require('./routes/users.routes')

const app = express()

app.use(express.json())

// Define endpoints
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/tasks', tasksRoutes)

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url}, does not exists in the server`
    })
})

module.exports = { app }