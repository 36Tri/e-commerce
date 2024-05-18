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
     

    const response = await User.create(req.body)
    return res.status(200).json({
        sucess: response ? true : false,
        response
    })          
})

module.exports = {
    register
}