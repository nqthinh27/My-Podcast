const Comments = require('../models/commentModel');
const Users = require('../models/userModel');
const Posts = require('../models/postModel');

const commentController = {
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
    getAllComments: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const comment = await Comments.findOne({ postId: req.params.id }, { comment: { $slice: [skip, limit] } })
                                          .populate('comment.userId', 'userName fullName avatar')
                                          .lean();
            if (!comment) return res.status(400).json({ msg: "This post does not exist!" });
            const totalComments = comment.comment.length;
            const totalPages = Math.ceil(totalComments / limit);
            const currentPage = page > totalPages ? totalPages : page;
            res.status(200).json({
                comment: comment.comment,
                pagination: {
                    currentPage,
                    totalPages,
                    totalComments
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    createComment: async (req, res) => {
        try {
            const { content } = req.body
            if (!content || content.length === 0)
                return res.status(400).json({ msg: "Please enter content of comment!" });
            const post = await Posts.findById(req.params.id)
            if (!post) return res.status(400).json({ msg: "This post does not exist." });
            const user = await Users.findById(req.user._id)
            if (!user) return res.status(400).json({ msg: "Please login" });
            const comments = await Comments.find({ postId: req.params.id })
            if (!comments) return res.status(400).json({ msg: "This post does not exist!" });

            const newComment = {
                userId: req.user._id,
                content: content,
            }

            comments[0].comment.push({
                $each: [newComment],
                $position: 0,
            });
            await comments[0].save()

            const postUpdateComments = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { comments: 1 } },
                { new: true } // trả về document sau khi được cập nhật
            );
            if (!postUpdateComments) return res.status(400).json({ msg: "This post does not exists!" });
            return res.status(200).json({ newComment })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)
            if (!post) return res.status(400).json({ msg: "This post does not exist." });
            const comments = await Comments.findOneAndUpdate({ postId: req.params.id }, {
                $pull: { comment: { _id: req.body.commentId } }
            }, { new: true })
            console.log(comments);
            if (!comments) return res.status(400).json({ msg: "This post does not exist!" });
            return res.status(200).json({ msg: "Deleted comment!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
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