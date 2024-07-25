const bcrypt = require("bcrypt")

exports.comparePasswords = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}