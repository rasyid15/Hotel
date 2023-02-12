const express = require('express')
const app = express()
const auth = require("../auth/auth")
app.use(express.json())

const userController = require("../controllers/user_controllers")
app.post("/login", userController.login)
app.get("/getAllUser", auth.authVerify, userController.getAllUser)
app.post("/addUser", auth.authVerify, userController.addUser)
app.post("/find", auth.authVerify, userController.findUser)
app.post("/", auth.authVerify, userController.addUser)
app.put("/:id", auth.authVerify, userController.updateUser)
app.delete("/:id", auth.authVerify, userController.deleteUser)

module.exports = app