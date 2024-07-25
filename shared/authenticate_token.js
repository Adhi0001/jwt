const jwt = require("jsonwebtoken")

exports.authenticateToken = async (req, res, next) => {
    let token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    token = token.split(' ')[1]
    const payload = await verifyToken(token)
    if (!payload) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    req.user = payload
    next()

}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                reject()
            } else {
                resolve(payload)
            }
        })
    })
}