const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')

// class APIfeatures {
//     constructor(query, queryString){
//         this.query = query;
//         this.queryString = queryString;
//     }

//     paginating(){
//         const page = this.queryString.page * 1 || 1
//         const limit = this.queryString.limit * 1 || 9
//         const skip = (page - 1) * limit
//         this.query = this.query.skip(skip).limit(limit)
//         return this;
//     }
// }

const postController = {
    // FOR USER
    createPost: async (req, res) => {
        try {
            const { title, content, image, audio, owner_id } = req.body

            if (title.length === 0)
                return res.status(400).json({ msg: "Please add your title." });

            if (!audio)
                return res.status(400).json({ msg: "Please add your audio." });

            const user = await Users.findById(req.body.owner_id);

            if (!user)
                return res.status(400).json({ msg: "Can not find this user." });

            const arr = [];
            const newPost = new Posts({
                title, content, image, audio, owner: owner_id
            })
            if (req.body.owner_id) {
                const post = Users.findById(req.body.owner_id);
                await post.updateOne({ $push: { posts: newPost._id } });
            }
            await newPost.save()

            res.json({
                msg: 'Created Post!',
                newPost: {
                    ...newPost._doc,
                    user_id: owner_id
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getPostById: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)
                .populate("owner likes comments", "avatar userName fullName")
            // .populate({
            //     path: "comments",
            //     populate: {
            //         path: "user likes",
            //         select: "-password"
            //     }
            // })
            res.status(200).json(post);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updatePostById: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id);
            await post.updateOne({ $set: req.body });
            res.status(200).json('Update successfully!!');
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    likePost: async (req, res) => {
        try {
            const post = await Posts.find({ _id: req.params.id, likes: req.user._id })
            if (post.length > 0) return res.status(400).json({ msg: "You liked this post." })
            const like = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $push: { likes: req.user._id }
            }, { new: true })
            if (!like) return res.status(400).json({ msg: 'This post does not exist.' })
            const updateLikeUser = Users.findOneAndUpdate({ _id: req.user._id }, {
                $push: { liked: req.params.id }
            }, { new: true });
            if (!updateLikeUser) return res.status(400).json({ msg: 'This post does not exist or not logged in.' })
            res.status(200).json({ msg: 'Liked Post!' })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    unLikePost: async (req, res) => {
        try {
            const post = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { likes: req.user._id }
            }, { new: true })
            if (!post) return res.status(400).json({ msg: 'This post does not exist.' })

            const user = await Users.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { liked: req.params.id }
            }, { new: true })
            if (!user) return res.status(400).json({ msg: 'This post does not exist.' })

            res.status(200).json({ msg: 'UnLiked Post!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    savePost: async (req, res) => {
        try {
            const userSaved = await Users.findOneAndUpdate({ _id: req.user._id }, {
                $push: { saved: req.params.id }
            }, { new: true })
            if (!userSaved) return res.status(400).json({ msg: 'User doest not exist or not logged in' });
            res.status(200).json({ msg: 'Saved Post!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    unSavePost: async (req, res) => {
        try {
            const user = await Users.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { saved: req.params.id }
            }, { new: true })
            if (!user) return res.status(400).json({ msg: 'This post does not exist.' })

            res.status(200).json({ msg: 'Un Saved Post!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    saveHistory: async (req, res) => {
        try {
            const user = await Users.findById(req.user._id);
            if (!user) return res.status(400).json({ msg: 'User doest not exist or not logged in' });
            const historyLength = user.history.length;
            if (historyLength == 50) {
                user.history.pop();
            }
            if (user.history.includes(req.params.id)) {
                user.history.pull(req.params.id);
            }

            user.history.push({
                $each: req.params.id,
                $position: 0,
            });
            await user.save();
            res.status(200).json({ msg: 'Saved post to history!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    unSaveHistory: async (req, res) => {
        try {
            const user = await Users.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { history: req.params.id }
            }, { new: true })
            if (!user) return res.status(400).json({ msg: 'This post does not exist.' })

            res.status(200).json({ msg: 'Un save post from history!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    deletePostById: async (req, res) => {
        try {
            const post = await Posts.findOneAndDelete({ _id: req.params.id })
            await Comments.deleteMany({ _id: { $in: post.comments } })
            res.status(200).json({
                msg: 'Deleted Post!',
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = postController;