const Posts = require('../models/postModel');
const Users = require('../models/userModel');
const Tags = require('../models/tagModel');
const today = new Date();
const last30Days = new Date(today.setDate(today.getDate() - 30));
const last7Days = new Date(today.setDate(today.getDate() - 7));

const homeController = {
    getTrendingPost: async (req, res) => {
        try {
            const topTrending = await Posts.find({ createdAt: { $gte: last30Days } })
                .sort({ views: -1 })
                .limit(9)
                .populate({
                    path: 'owner',
                    select: 'userName fullName',
                })
                .select('_id title image views owner');
            return res.status(200).json(topTrending);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getSliderPost: async (req, res) => {
        try {
            const topTrending = await Posts.find({ createdAt: { $gte: last7Days } })
                .sort({ likes: -1 })
                .limit(5)
                // .populate({
                //     path: 'owner',
                //     select: 'userName fullName',
                // })
                .select('_id title content image likes');
            return res.status(200).json(topTrending);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getNewReleasePosts: async (req, res) => {
        try {
          const topUsers = await Users.aggregate([
            { $project: { followers: { $size: '$followers' }, _id: 1 } },
            { $sort: { followers: -1 } },
            { $limit: 100 },
          ]);
    
          const topUserIds = topUsers.map((user) => user._id);
    
          const newRelasePosts = await Posts.find({
            createdAt: { $gte: last7Days },
            owner: { $in: topUserIds },
          })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate({
              path: 'owner',
              select: 'userName fullName',
            })
            .select('_id title image owner createdAt');
    
          return res.status(200).json(newRelasePosts);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
      },

    getPostsByTag: async (req, res) => {
        try {
            const tag = await Tags.findOne({ tag: req.body.tag })
                // .sort({ views: -1 })
                .limit(10)
                .populate({
                    path: 'postIds',
                    select: '_id title image owner createdAt',
                    populate: {
                        path: 'owner',
                        select: 'fullName userName',
                    }
                })
            return res.status(200).json(tag.postIds);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getTopAuthor: async (req, res) => {
        try {
            const users = await Users.aggregate([
                { $unwind: '$followers' },
                {
                  $group: {
                    _id: '$_id',
                    totalFollowers: { $sum: 1 }
                  }
                },
                { $sort: { totalFollowers: -1 } },
                { $limit: 10 }
              ]);
          
              const userIds = users.map(user => user._id);
          
              const mostFollowedUsers = await Users.find({ _id: { $in: userIds } })
                .select('avatar userName fullName followers');
          
              res.status(200).json(mostFollowedUsers);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = homeController;