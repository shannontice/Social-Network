const router = require('express').Router()
const {createUser, getUsers, oneUser, updateUser, deleteUser, addFriend, deleteFriend} = require('../controllers/user_controller')

// Create User
router.post('/user', createUser )

// Get All Users
router.get('/user', getUsers)

// Get One User By ID
router.get('/user/:id', oneUser)

// Update User
router.put('/user/:id', updateUser)

// Delete User
router.delete('/user/:id', deleteUser)

// Add Friend 
router.post('/user/:userId/friend/:friendId', addFriend)

// Delete Friend
router.delete('/user/:userId/friend/:friendId', deleteFriend)

module.exports = router