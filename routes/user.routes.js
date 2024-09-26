const router = require('express').Router()
const userController = require("../controllers/user.controller")

// Register
router.post('/register', userController.register)

// Login
router.post('/login', userController.login)

// Logout
router.post('/logout', userController.logout)

module.exports = router