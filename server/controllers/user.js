const User = require('../models/User');


const getUserById = async (req, res) => {
  const { userId } = req.params;
  console.log(req.params)

  try {
    const user = await User.findById(userId).select('name'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: 'Server error while fetching user data' });
  }
};

module.exports = { getUserById };