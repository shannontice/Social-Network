const User = require('../models/User')

module.exports = {
    async createUser(req, res) {
        const user = await User.create(req.body)

        res.json(user)
    },
    async getUsers(req, res) {
        const users = await User.find()

        res.json(users)
    },
    async oneUser(req, res) {
        const user_id = req.params.id

        const user = await User.findById(user_id)

        res.json(user)
    },
    async updateUser(req, res) {
        const { id } = req.params;
        const { username } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: { username: username } },
            { new: true });

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    },
    async deleteUser(req, res) {
        const user_id = req.params._id

        await User.deleteOne(user_id)

        res.json({
            message: 'User Deleled'
        })
    },
    async addFriend(req, res) {
        const { userId, friendId } = req.params;

        // Find the user by userId and add Friend
        const addedFriend = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true }
        );

        if (!addedFriend) {
            return res.status(404).json({ message: 'Friend could not be added' });
        }

        res.json(addedFriend);

    },
    async deleteFriend(req, res) {
    const { userId, friendId } = req.params;

        // Find the user by userId and delete Friend
        const deletedFriend = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
        );

        if (!deletedFriend) {
            return res.status(404).json({ message: 'Friend could not be deleted' });
        }

        res.json(deletedFriend);
    } 
};
    
