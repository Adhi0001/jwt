const jwt = require("jsonwebtoken")

exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, ({ expiresIn: "6h" }))
}