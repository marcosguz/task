const { User } = require('./users.model')
const { Task } = require('./tasks.model')

const initModels = () => {

    User.hasMany(Task, { foreignKey: 'userId' })
    Task.belongsTo(User)

}

module.exports = { initModels }