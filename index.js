/* TODO:
1 --> STORE MONGO DB URL IN .ENV 
2 --> CONNECT APPLICATION TO CVWS-NEW DB
3 --> ACCESS USERS
4 --> IN THE FUNCTION VERIFY USER YOU WILL ACTUALLY VERIFY THE LIVE USERS IN VERIFACTS
5 --> IF USERS ARE VERIFIED LOG THEM IN
6 --> MAKE SOME ROUTES AND AUTHENTICATE USERS AND SHOW SOME PERSONALISED DATA
*/

const express = require("express")
const { generateToken } = require("./shared/generate_token")
const { authenticateToken } = require("./shared/authenticate_token")
const userRoutes = require("./routes/user.routes")
const { default: mongoose } = require("mongoose")
const app = express()
require("dotenv").config()


app.use(express.json())

app.use("/user", userRoutes)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to db")
        app.listen(4567, () => {
            console.log("Listening on port:", 4567)
        })
    })