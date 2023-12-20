const express = require('express');
const { registerUser,getAllUsers, authUser, logout, getUserById,deleteUser, updateUser} = require('../controller/userController')
const { admin, protect } = require('../middleware/authMiddleware')
const checkObjectId = require('../middleware/CheckObjectId')
const router = express.Router();

router.route('/').post(registerUser).get(protect, admin,getAllUsers)
router.route('/auth').post(authUser)
router.route('/logout').post(logout)
router.route('/:id').get(protect, admin,checkObjectId,getUserById).delete(protect, admin,checkObjectId,deleteUser).put(protect, admin,checkObjectId,updateUser)

module.exports = router;