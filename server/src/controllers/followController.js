const Users = require('../models/userModel');


const followController = {
    // FOR USER
    followOther: async (req, res) => {
        try {
            const other_id = req.params.id;

            const other = await Users.findOneAndUpdate(
                { _id: other_id },
                { $push: { followers: req.user._id } },
                { new: true }
            );
            if (!other) return res.status(400).json({ msg: 'User does not exists.' });

            const user = await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $push: { following: other_id } },
                { new: true }
            );
            if (!user) return res.status(400).json({ msg: 'User does not exists.' });

            res.json({
                msg: 'Followed!',
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    unFollowOther: async (req, res) => {
        try {
            const other_id = req.params.id;

            const other = await Users.findOneAndUpdate(
                { _id: other_id },
                { $pull: { followers: req.user._id } },
                { new: true }
            );
            if (!other) return res.status(400).json({ msg: 'User does not exists.' });

            const user = await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { following: other_id } },
                { new: true }
            );
            if (!user) return res.status(400).json({ msg: 'User does not exists.' });

            res.json({
                msg: 'Un followed!',
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // Get all followers
    getFollowers: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 15;
            const skip = (page - 1) * limit;

            const user = await Users.findById(req.params.id).populate({
                path: 'followers',
                select: 'fullName userName avatar followers posts',
                options: {
                    skip,
                    limit: parseInt(limit)
                }
            });
            const userTransfer = user.followers.map(item => {
                return {
                    _id: item._id,
                    fullName: item.fullName,
                    userName: item.userName,
                    avatar: item.avatar,
                    followersLength: item.followers.length,
                    postsLength: item.posts.length}
            })
            const totalFollower = user.followers.length;
            const totalPages = Math.ceil(totalFollower / limit);
            res.status(200).json({
                follower: userTransfer,
                currentPage: parseInt(page),
                totalPages,
                totalFollower
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // Get all following
    getFollowing: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 15;
            const skip = (page - 1) * limit;

            const user = await Users.findById(req.params.id).populate({
                path: 'following',
                select: 'fullName userName avatar',
                options: {
                    skip,
                    limit: parseInt(limit)
                }
            });
            const userTransfer = user.following.map(item => {
                return {
                    _id: item._id,
                    fullName: item.fullName,
                    userName: item.userName,
                    avatar: item.avatar,
                    followersLength: item.followers.length,
                    postsLength: item.posts.length}
            })
            const totalFollowing = user.following.length;
            const totalPages = Math.ceil(totalFollowing / limit);
            res.status(200).json({
                following: userTransfer,
                currentPage: parseInt(page),
                totalPages,
                totalFollowing
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

module.exports = followController;