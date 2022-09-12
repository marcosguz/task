const bcrypt = require('bcryptjs')

const { User } = require('../models/users.model')

const getAllUsers = async (req, res) => {

    try {
        const users = await User.findAll({
            where: { status: 'active' }
        })

        res.status(200).json({
            status: 'success',
            data: { users }
        })
    } catch (error) {
        console.log(error)
    }

}

const createUser = async (req, res) => {

    try {
        const { name, email, password } = req.body

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        newUser.password = undefined

        res.status(201).json({
            status: 'success',
            data: { newUser }
        })

    } catch (error) {
        console.log(error)
    }

}

const updateUser = async (req, res) => {

    try {
        const { name, email } = req.body;
        const { user } = req;

        // Update using a model's instance
        await user.update({ name, email });

        res.status(200).json({
            status: "success",
            data: { user },
        });
    } catch (error) {
        console.log(error);
    }

}

const deleteUser = async (req, res) => {

    try {
        const { user } = req

        await user.update({ status: 'disabled' })

        res.status(204).json({ status: 'success' })

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}