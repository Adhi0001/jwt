const express = require("express")
const { register, login, userDetails } = require("../controllers/user.controller")
const { authenticateToken } = require("../shared/authenticate_token")
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/userDetails", authenticateToken, userDetails)


module.exports = router