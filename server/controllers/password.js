const UserModel = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function password(req,res){
    try {
        const { password, userId } = req.body
        

        const user = await UserModel.findById(userId)
       

        const verifyPassword = await bcrypt.compare(password,user.password)

        if(!verifyPassword){
            return res.status(400).json({
                message : "Please check password",
                error : true
            })
        }

        const tokenData = {
            id : user._id,
            email : user.email 
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET,{ expiresIn : '1d'})

        return res.cookie('token', token, {http : true,secure : true}).status(200).json({
            message : "Login successfully",
            token : token,
            success :true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = password