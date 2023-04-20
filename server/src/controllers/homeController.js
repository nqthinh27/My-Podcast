const Posts = require('../models/postModel');
const today = new Date();
const last30Days = new Date(today.setDate(today.getDate() - 30));

const homeController = {
    getTrendingPost: async (req, res) => {
        try {
            const topTrending = await Posts.find({ createdAt: { $gte: last30Days } })
                .sort({ views: -1 })
                .limit(9)
                .populate({
                    path: 'owner',
                    select: 'userName fullName avatar',
                    // populate: {
                    //     path: 'owner',
                    //     select: 'userName fullName avatar'
                    // }
                })
                .select('_id title image audio views owner');
            const { _id, title, image, audio, owner } = topTrending;
            return res.status(200).json(topTrending);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    },
}

module.exports = homeController;