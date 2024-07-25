const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const { comparePasswords } = require("../shared/utils")
const { generateToken } = require("../shared/generate_token")

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const userData = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        await userData.save()

        return res.status(201).json({ message: "User Created Successfully." })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log("Request body:", JSON.stringify(req.body))
        // Search email in user database
        const userData = await User.findOne({ email })
        console.log("User Data:", JSON.stringify(userData))

        // if email doesnt exist
        // return unauthorised
        if (!userData) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        // if exists
        // compare passwords
        const isMatch = comparePasswords(password, userData.password)
        console.log("Passwords Match?:", isMatch)

        // if passwords dont match
        // return unauthorized
        if (!isMatch) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        // if password matches
        // return jwt
        const token = generateToken({ user_id: userData._id, email: userData.email })
        console.log("Token:", token)

        return res.json({ access_token: token })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}



exports.userDetails = async (req, res) => {
    try {
        const user = req.user
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}

