const dotenv = require('dotenv');
const { app } = require('./app')
const { db } = require('./utils/database.util')

const { initModels } = require('./models/initModels')

dotenv.config({ path: './config.env' });

const startServer = async () => {
    try {

        await db.authenticate()

        initModels()

        await db.sync()

        const PORT = 4000

        app.listen(PORT, () => {
            console.log('Server running!')
        })

    } catch (error) {
        console.log(error)
    }
}

startServer()