const express = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
  loginUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', toggleUserStatus);

module.exports = router;
