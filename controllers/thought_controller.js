const Thought = require('../models/Thought')

module.exports = {
    async createThought(req, res) {
        const thought = await Thought.create(req.body)

        res.json(thought)
    },

    async getThoughts(req, res) {
        const thoughts = await Thought.find()

        res.json(thoughts)
    },

    async oneThought(req, res) {
        const thought_id = req.params.id

        const thought = await Thought.findById(thought_id)

        res.json(thought)
    },

    async updateThought(req, res) {
        const { id } = req.params;
        const { thoughtText } = req.body;

        const updatedThought = await Thought.findOneAndUpdate(
            { _id: id },
            { $set: { thoughtText: thoughtText } },
            { new: true });

        if (updatedThought) {
            res.json(updatedThought);
        } else {
            res.status(404).json({ error: 'Thought not found' });
        }
    },

    async deleteThought(req, res) {
        const thought_id = req.params._id

        await Thought.deleteOne(thought_id)

        res.json({
            message: 'Thought Deleted'
        })
    },

    async addReaction(req, res) {
        const { thoughtId } = req.params;
        const { reactionBody, username } = req.body;

        // Find the thought and add a reaction
        const reactionAdded = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push: { reactions: { reactionBody, username } } },
            { new: true }
        );

        if (!reactionAdded) {
            return res.status(404).json({ message: 'Reaction not added' });
        }

        res.json(reactionAdded);
    },

    async deleteReaction(req, res) {
        const { thoughtId } = req.params;
        const { reactionId } = req.body;


        // Find the thought and delete the reaction
        const reactionDeleted = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { reactionId } } },
            { new: true }
        );

        if (!reactionDeleted) {
            return res.status(404).json({ message: 'Reaction not removed' });
        }

        res.json(reactionDeleted);
    }
}