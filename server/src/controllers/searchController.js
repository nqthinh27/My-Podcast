const Users = require('../models/userModel');
const Posts = require('../models/postModel');
const viToEng = require('../helper/transform');

const searchController = {
    /**
    * user
    */
    searchUser: async (req, res) => {
        try {
            const userName = req.body.userName;
            // const userNameSplit = userName.trim().split(' ');
            const userNameSplit = viToEng(userName).trim().split(' ');
            const userNameStandard = userNameSplit.join("");
            const regex = new RegExp(userNameStandard, 'i'); // Tạo một biểu thức chính quy với chuỗi tìm kiếm
            const users = await Users.find({ userName: regex })
                .select('userName fullName avatar followers following posts');
            const byUserName = users.map(user => {
                return {
                    userName: user.userName,
                    fullName: user.fullName,
                    avatar: user.avatar,
                    followersLength: user.followers.length,
                    followingLength: user.following.length,
                    postsLength: user.posts.length,
                };
            }).sort((a, b) => b.followersLength - a.followersLength);


            const allUsers = await Users.find()
            .select('userName fullName avatar followers following posts');
            // Duyệt qua mỗi post và tính toán duplicity dựa trên số từ khóa trùng lặp
            const rankedUsers = allUsers.map((user) => {
                const engUserName = viToEng(user.fullName).trim().split(' ');
                let duplicity = 0;
                userNameSplit.forEach((word) => {
                    if (engUserName.includes(word)) {
                        duplicity++;
                    }
                });
                return { 
                    userName: user.userName,
                    fullName: user.fullName,
                    avatar: user.avatar,
                    followersLength: user.followers.length,
                    followingLength: user.following.length,
                    postsLength: user.posts.length,
                    duplicity: duplicity};
            });

            // Sắp xếp các bài post theo duplicity giảm dần
            const byFullName = rankedUsers.filter(post => post.duplicity > 0).sort((a, b) => {
                if (a.duplicity === b.duplicity) {
                    return b.followersLength - a.followersLength;
                }
                return b.duplicity - a.duplicity;
            }).slice(0, 15);

            var result = [...byUserName];

            byFullName.forEach(currentFullName => {
                if (!result.some(item => item.userName === currentFullName.userName)) {
                    result.push(currentFullName);
                }
            })
        
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    searchPost: async (req, res) => {
        try {
            const title = req.body.title;
            const titleSplit = viToEng(title).trim().split(' ');
            const posts = await Posts.find()
            .select("_id title image likes views owner createdAt")
            .populate({
                path: 'owner',
                select: '_id userName fullName'
            });
            // Duyệt qua mỗi post và tính toán duplicity dựa trên số từ khóa trùng lặp
            const rankedPosts = posts.map((post) => {
                const engTitle = viToEng(post.title).trim().split(' ');
                let duplicity = 0;
                titleSplit.forEach((word) => {
                    if (engTitle.includes(word)) {
                        duplicity++;
                    }
                });
                return { ...post.toObject(), duplicity };
            });

            // Sắp xếp các bài post theo duplicity giảm dần
            const filteredPosts = rankedPosts.filter(post => post.duplicity > 0).sort((a, b) => {
                if (a.duplicity === b.duplicity) {
                    return b.views - a.views;
                }
                return b.duplicity - a.duplicity;
            }).slice(0, 15);
            res.status(200).json(filteredPosts);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}
module.exports = searchController;