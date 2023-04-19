const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')
const Tags = require('../models/tagModel')


const postController = {
    // FOR USER
    createTag: async (req, res) => {
        try {
            const { tag } = req.body

            if (tag.length === 0)
                return res.status(400).json({ msg: "Please add your tag." });

            const newTag = new Tags({
                tag: tag,
            })
            await newTag.save()
            res.json({
                msg: 'Created Tag!',
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getPostByTag: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 15;
            const skip = (page - 1) * limit;
            
            const tag = await Tags.findOne({tag: req.body.tag}).populate({
                path: 'postIds',
                select: '_id title image likes views',
                options: {
                    skip,
                    limit: parseInt(limit)
                }
            });
            if (!tag) return res.status(400).json({ msg: "Tag not exists." });
            const totalPosts = tag.postIds.length;
            const totalPages = Math.ceil(totalPosts / limit);
            
            return res.status(200).json({
                posts: tag.postIds,
                currentPage: parseInt(page),
                totalPages,
                totalPosts
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = postController;