const Likes = require('../models/likeModel');
const Posts = require('../models/postModel');

const likeController = {
    getUserLiked: async (req, res) => {
        try {
            const userLikedId = req.user.liked.toString();
            const userLiked = await Likes.findById(userLikedId).populate({
                path: 'liked',
                select: '_id title owner image likes views',
                populate: {
                    path: 'owner',
                    select: 'userName fullName avatar'
                }
            });
            if (!userLiked) return res.status(400).json({ msg: 'User doest not exist or not logged in' });
            res.status(200).json(userLiked);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addToLiked: async (req, res) => {
        try {
            const userLikedId = req.user.liked.toString();
            const userLiked = await Likes.findById(userLikedId);
            if (!userLiked) return res.status(400).json({ msg: 'User doest not exist or not logged in' });
            userLiked.liked.push({
                $each: [req.params.id],
                $position: 0,
            });
            await userLiked.save();
            const updatePost = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { likes: 1 } },
                { new: true } // trả về document sau khi được cập nhật
            );
            if (!updatePost) return res.status(400).json({ msg: "This post does not exists!" });
            res.status(200).json({ msg: 'Saved post to liked list!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    removeFromLiked: async (req, res) => {
        try {
            const userLikedId = req.user.liked.toString();
            const userLiked = await Likes.findOneAndUpdate({ _id: userLikedId }, {
                $pull: { liked: req.params.id }
            }, { new: true })
            if (!userLiked) return res.status(400).json({ msg: 'This post does not exist.' })
            const updatePost = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { likes: -1 } },
                { new: true } // trả về document sau khi được cập nhật
            );
            if (!updatePost) return res.status(400).json({ msg: "This post does not exists!" });
            res.status(200).json({ msg: 'Unsave post from liked list!' });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // CHƯA TEST
    removeMutipleFromLiked: async (req, res) => {
        const ids = req.body.ids;
        try {
            const userLikedId = req.user.liked.toString();
            const userLiked = await Likes.findOneAndUpdate(
                { _id: userLikedId },
                { $pull: { liked: { $in: ids } } },
                { new: true }
            );
            if (!userLiked) {
                return res.status(400).json({ msg: 'This post does not exist.' });
            }
            res.status(200).json({ msg: 'Unsave posts from liked list!' });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = likeController;