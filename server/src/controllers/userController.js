const Users = require('../models/userModel');

const userController = {
    /**
    * user
    */
    getAllUsers: async (req, res) => {
        try {
            const user = await Users.find();
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // GET USER BY ID
    getUserById: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id);
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

    // GET USER POST
    getUserPost: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).populate('posts');
            res.status(200).json(user.posts);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    /**
    * for Library
    */
    // LIKED
    getAllLiked: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).populate('posts');
            res.status(200).json(user.liked);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // SAVED
    getAllSaved: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).populate('posts');
            res.status(200).json(user.saved);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // HISTORY
    getAllHistory: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).populate('posts');
            res.status(200).json(user.history);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = userController;