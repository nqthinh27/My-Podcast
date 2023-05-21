const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')
const Tags = require('../models/tagModel')

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

            const newPost = new Posts({
                title, content, image, audio, owner: req.user._id, tag: req.body.tag || [],
            })
            const newPostComment = new Comments({ postId: newPost._id });
            await newPostComment.save();
            const tags = await Tags.find({ tag: { $in: req.body.tag } });
            for (const tag of tags) {
                tag.postIds.push({
                    $each: [newPost._id],
                    $position: 0,
                });
                await tag.save();
            }
            if (req.user._id) {
                const post = Users.findById(req.user._id);
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
                .populate("owner likes comments", "avatar userName fullName posts followers")
            res.status(200).json({
                ...post._doc,
                owner: {
                    _id: post.owner._id,
                    fullName: post.owner.fullName,
                    userName: post.owner.userName,
                    avatar: post.owner._id,
                    followers: post.owner.followers.length,
                    posts: post.owner.posts.length,
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updatePostById: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id);
            await post.updateOne({ $set: req.body }, { new: true });
            res.status(200).json('Update successfully!!');
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

    increaseViews: async (req, res) => {
        try {
            const update = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { views: 1 } },
                { new: true } // trả về document sau khi được cập nhật
            );
            if (!update) return res.status(400).json({ msg: "This post does not exists!" });
            return res.status(200).json("Inscreased view!");
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

}

module.exports = postController;