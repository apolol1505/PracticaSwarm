const {Router} = require('express');
const router = Router();

const {getUsers, createUsers, getUser, deleteUser, updateUser} = require('../controller/usuario.controller')

router.route('/')
    
    .get(getUsers)
    .post(createUsers)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;