const express = require('express');
const userController = require('../controllers/user-controller');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.delete('/:userId', userController.deleteUsers);
router.patch('/profile/:userId', userController.editUserProfile);
module.exports = router;
