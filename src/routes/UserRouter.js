const express = require('express');
const router = express.Router();
const useController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

router.post('/sign-up', useController.createUser);
router.post('/sign-in', useController.loginUser);
router.post('/log-out', useController.logOutUser);
router.put('/update-user/:id', authUserMiddleware, useController.updateUser);
router.delete('/delete-user/:id', authMiddleware, useController.deleteUser);
router.get('/getAll', authMiddleware, useController.getAllUser);
router.get('/get-details/:id',authUserMiddleware, useController.getDetailsUser);
router.post('/refresh-token', useController.refreshToken);
router.post('/delete-many', authMiddleware, useController.deleteMany);



module.exports = router;