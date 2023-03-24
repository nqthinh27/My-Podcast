const Users = require('../models/userModel');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const user = await Users.find();
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // GET USER BY ID
    getUserById: async(req,res) => {
        try {
            const user = await Users.findById(req.params.id);
            // .populate('posts')
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // UPDATE USER BY ID
    updateUserById: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id);
            await user.updateOne({ $set: req.body });
            res.status(200).json('Update Successfully!');
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },


    // DELETE USER BY ID
    deleteUserById: async (req,res) => {
        try {
            const user = await Users.findById(req.params.id);
            res.status(200).json({msg: Deleted});
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = userController;