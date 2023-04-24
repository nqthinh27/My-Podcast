const Posts = require('../models/postModel');
const Users = require('../models/userModel');
const today = new Date();
const last30Days = new Date(today.setDate(today.getDate() - 30));
const followingController = {
    getNewFeedPost: async (req, res) => {
        try {
            const currentUser = await Users.findOne({ _id: req.user._id });
            if (!currentUser) return res.status(401).json({ mgs: "Unauthorized" });
            const following = currentUser.following;
            const latestPosts = await Posts.find({
                owner: { $in: following },
                createdAt: { $gte: last30Days },
            })
                .sort({ createdAt: -1 })
                .select('title content image audio likes comments views createdAt')
                .populate('owner', '_id fullName userName avatar');
            return res.status(200).json(latestPosts);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = followingController;