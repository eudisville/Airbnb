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
        const { email, password } = req.body;

        // Verify if user exists in the DB
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        // Search user in the DB by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        // Compare password with password in the DB
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        // If right, send cookie
        cookieToken(user, res);
    } catch (err) {
        res.status(500).json({ message: `Error: ${err.message}` });
    }
}

exports.logout = async (req, res) => {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.status(200).json({
      success: true,
      message: 'Logged out',
    });
  };