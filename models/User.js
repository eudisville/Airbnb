const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name : String, 
    email : {
        type : String, 
        unique : true
    } , 
    password : String
})

// encrypt password before saving it into the DB
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
  })
  
  // create and return jwt token
  userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    })
  }
  
  // validate the password
  userSchema.methods.isValidatedPassword = async function (userSentPassword) {
    return await bcrypt.compare(userSentPassword, this.password)
  }

const User = mongoose.model('User', userSchema)
module.exports = User