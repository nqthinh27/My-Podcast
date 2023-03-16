const User = require('../models/userModel');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deleteUserById: async (req,res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json({msg: Deleted});
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = userController;