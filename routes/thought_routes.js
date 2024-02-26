const router = require('express').Router()
const {createThought, getThoughts, oneThought, updateThought, deleteThought, addReaction, deleteReaction} = require('../controllers/thought_controller')

// Create Thought
router.post('/thought', createThought )

// Get All Thoughts
router.get('/thoughts', getThoughts)

// Get One Thought By ID
router.get('/thought/:id', oneThought)

// Update Thought
router.put('/thought/:id', updateThought)

// Delete Thought
router.delete('/thought/:id', deleteThought)

// Create Thought Reaction
router.post('thought/:thoughtId/reactions', addReaction)

// Delete Thought Reaction
router.delete('thought/:thoughtId/reactions', deleteReaction)

module.exports = router