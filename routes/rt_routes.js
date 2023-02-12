const express = require('express')
const app = express()
app.use(express.json())

const roomTypeController = require("../controllers/roomType_controllers")
app.get("/getAllRoomType", roomTypeController.getAllRoomType)
app.post("/addRoomType", roomTypeController.addRoomType)
app.post("/find", roomTypeController.findRoomType)
app.put("/:id", roomTypeController.updateRoomType)
app.delete("/:id", roomTypeController.deleteRoomType)

module.exports = app