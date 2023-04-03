const Comments = require('../models/commentModel');
const Users = require('../models/userModel');
const Posts = require('../models/postModel');

const commentController = {
    createComment: async (req, res) => {
        try {
            const { postId, content } = req.body
            if (!content || content.length === 0)
                return res.status(400).json({ msg: "Please enter content of comment!" });
            const post = await Posts.findById(req.params.id)
            if (!post) return res.status(400).json({ msg: "This post does not exist." });
            const user = await Users.findById(req.user._id)
            if (!user) return res.status(400).json({ msg: "Please loggin" });

            const newComment = new Comments({
                content, owner: req.user._id, post: req.params.id
            })
            await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $push: { comments: newComment._id}
            }, { new: true });
            await newComment.save()
            res.json({ newComment })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // updateComment: async (req, res) => {
    //     try {
    //         const { content } = req.body

    //         await Comments.findOneAndUpdate({
    //             _id: req.params.id, user: req.user._id
    //         }, { content })

    //         res.json({ msg: 'Update Success!' })

    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message })
    //     }
    // },
    // likeComment: async (req, res) => {
    //     try {
    //         const comment = await Comments.find({ _id: req.params.id, likes: req.user._id })
    //         if (comment.length > 0) return res.status(400).json({ msg: "You liked this post." })

    //         await Comments.findOneAndUpdate({ _id: req.params.id }, {
    //             $push: { likes: req.user._id }
    //         }, { new: true })

    //         res.json({ msg: 'Liked Comment!' })

    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message })
    //     }
    // },
    // unLikeComment: async (req, res) => {
    //     try {

    //         await Comments.findOneAndUpdate({ _id: req.params.id }, {
    //             $pull: { likes: req.user._id }
    //         }, { new: true })

    //         res.json({ msg: 'UnLiked Comment!' })

    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message })
    //     }
    // },
    // deleteComment: async (req, res) => {
    //     try {
    //         const comment = await Comments.findOneAndDelete({
    //             _id: req.params.id,
    //             $or: [
    //                 { user: req.user._id },
    //                 { postUserId: req.user._id }
    //             ]
    //         })

    //         await Posts.findOneAndUpdate({ _id: comment.postId }, {
    //             $pull: { comments: req.params.id }
    //         })

    //         res.json({ msg: 'Deleted Comment!' })

    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message })
    //     }
    // },
}

module.exports = commentController;