const express = require(`express`)
const bodyParser = require('body-parser')
const app = express()
const PORT = 8000
const cors = require(`cors`)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRoute = require(`./routes/user_routes`)
const { getAllUser, findUser } = require("./controllers/user_controllers")
app.use(`/user`, userRoute)

const rtRoute = require(`./routes/rt_routes`)
const { getAllRoomType, findRoomType } = require("./controllers/roomType_controllers")
app.use(`/roomType`, rtRoute)

app.listen(PORT, () => {
    console.log(`Server of Hotel's runs on port
        ${PORT}`)
})