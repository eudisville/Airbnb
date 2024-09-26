const bcrypt = require("bcrypt")
const User = require("../models/User")
const cookieToken = require("../utils/cookieToken")

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" })
    }

    // Check if user is already registered
    let user = await User.findOne({ email })

    if (user) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password:hashedPassword })

    // After creating user in the DB send cookie
    cookieToken(user, res)
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Check presence of email and password
        if(!email || !password) return res.status(400).json({ message: "Email and password are required!" });

        // Match the password
        const isPasswordCorrect = await user.isValidatedPassword(password)

        if(!isPasswordCorrect) return res.status(400).json({ message: "Email or password is incorrect" });

        // If everything is fine, send the token
        cokenToken(user, res)
    }
    catch(err) {
        res.status(400).json({ message: `Error: ${err}`})
    }
}

exports.logout = async (req, res) => {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,   // Only send over HTTPS
      sameSite: 'none' // Allow cross-origin requests
    });
    res.status(200).json({
      success: true,
      message: 'Logged out',
    });
  };