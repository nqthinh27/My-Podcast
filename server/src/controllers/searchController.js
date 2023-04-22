const Users = require('../models/userModel');
const Posts = require('../models/postModel');

const searchController = {
    /**
    * user
    */
    getUserByUserName: async (req, res) => {
        try {
            const userName = req.body.userName;
            const userNameSplit = userName.trim().split(' ');
            const users = await Users.find({ userName: req.body.userName })
                .select('userName fullName avatar followers following posts');
            const usersRes = users.map(user => {
                return {
                    userName: user.userName,
                    fullName: user.fullName,
                    avatar: user.avatar,
                    followersLength: user.followers.length,
                    followingLength: user.following.length,
                    postsLength: user.posts.length,
                };
            }).sort((a, b) => b.followersLength - a.followersLength);
            res.status(200).json(usersRes);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}
module.exports = searchController;