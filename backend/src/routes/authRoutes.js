const express = require('express')
const router = express.Router()

const { login, register, logout } = require('../controllers/authController')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/logout').post(logout); // Post for actions that change state, get has no side effects

module.exports = router