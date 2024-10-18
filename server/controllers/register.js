const User = require("../models/User");
const bcrypt = require('bcryptjs');

async function register(req, res) {
    const { name, email, password, profilePic } = req.body;
    console.log(req.body);
    try {
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ error: "User already exists", err:true });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword, profilePic });

        return res.status(201).json({ message:"User created", data:user, success:true });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message || error, err:true});
    }
}

module.exports = register;