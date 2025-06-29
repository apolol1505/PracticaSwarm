const usuarioController = {}

const Users = require('../models/usuario')


usuarioController.getUsers = async (req, res) => {
    const users = await Users.find()
    res.json(users)
}

usuarioController.createUsers = async (req, res) => {
    const { nombre, email, edad } = req.body;
    const newUser = new Users({
        nombre: nombre,
        email: email,
        edad: edad,
    })
    await newUser.save()
    res.json({ message: 'Usuario creado' })
}

usuarioController.getUser = async (req, res) => {
    const user = await Users.findById(req.params.id)
    res.json(user)
}
usuarioController.deleteUser = async (req, res) => {
    await Users.findByIdAndDelete(req.params.id)
    res.json({ message: 'Usuario eliminado' })
}
usuarioController.updateUser = async (req, res) => {
    const { nombre, email, edad } = req.body;
    await Users.findByIdAndUpdate(req.params.id, {
        nombre,
        email,
        edad
    })
    res.json({ message: 'Usuario actualizado' })
}

module.exports = usuarioController