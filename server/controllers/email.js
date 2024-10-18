const UserModel = require("../models/User")

async function email_check(req,res){
    try {
        const { email } = req.body

        const user = await UserModel.findOne({email}).select("-password")

        if(!user){
            return res.status(400).json({
                message : "user not exit",
                error : true
            })
        }

        return res.status(200).json({
            message : "email verify",
            success : true,
            data : user
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = email_check