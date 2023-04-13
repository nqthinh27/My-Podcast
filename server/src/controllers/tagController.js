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
}

module.exports = postController;