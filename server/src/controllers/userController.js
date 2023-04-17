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

    /**
     * USER ACTION
     */
    // GET USER POST
    getUserPost: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 15;
            const skip = (page - 1) * limit;

            const user = await Users.findById(req.params.id).populate({
                path: 'posts',
                select: '_id title image likes views',
                options: {
                    skip,
                    limit: parseInt(limit)
                }
            });

            const totalPosts = user.posts.length;
            const totalPages = Math.ceil(totalPosts / limit);

            res.status(200).json({
                posts: user.posts,
                currentPage: parseInt(page),
                totalPages,
                totalPosts
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // Get all followers
    getAllFollowers: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).populate({
                path: 'followers',
                select: 'fullName userName avatar gender'
              });
            res.status(200).json(user.followers);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // Get all following
    getAllFollowing: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).populate({
                path: 'following',
                select: 'fullName userName avatar gender'
              });
            res.status(200).json(user.following);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    
    // FOLLOW OTHER USER
    followOther: async (req, res) => {
        try {
            const user = await Users.findOneAndUpdate({ _id: req.user._id }, {
                $push: { following: req.params.id }
            }, { new: true })
            if (!user) return res.status(400).json({ msg: 'This user does not exist or not logged in' });
            
            const other = await Users.findOneAndUpdate({ _id: req.params.id }, {
                $push: { followers: req.user._id }
            }, { new: true })
            if (!other) return res.status(400).json({ msg: 'This user does not exist or not logged in' });

            res.status(200).json({ msg: 'Followed!' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
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
}

module.exports = userController;