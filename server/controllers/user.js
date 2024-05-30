const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async(req, res) => {
    const {email, password, firstName, lastName} = req.body

    console.log(email, password, firstName, lastName)
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
            sucess: false,
            message: 'Missing Inputs',
        })
    }

    const user = await User.findOne({email})
    if (user) throw new Error('User existed')
    else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            sucess: newUser ? true : false,
            mess: newUser ? 'Register is Successful. Please Login!!!!!' : 'Something went wrong'
        })
    }         
})

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    console.log(req)

    if (!email || !password) 
        return res.status(400).json({
            sucess: false,
            message: 'Missing Inputs',
        })

    const response = await User.findOne({email})
    if (response && await response.isCorrectPassword(password)){
        const { password, role, ...userData } = response.toObject()
        return res.status(200).json({
            sucess: true,
            userData
        })
    } else {
        throw new Error('Invalid password!!!')
    }
})

module.exports = {
    register,
    login
}