const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()

// Routes
const userRoutes = require("./routes/user.routes")

// Middlewares
app.use(bodyParser.json())

// Routes using
app.use('/user', userRoutes)

mongo_uri = "mongodb+srv://eudisville:50G2OK@cluster35.wu2xhof.mongodb.net/"
mongoose.connect(mongo_uri, {

}).then(() => console.log("Mongo conncted"))
.catch((err) => console.log(`Error : ${err}`))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is listenning on http://localhost:${PORT}`))