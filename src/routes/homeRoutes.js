const express = require('express');
const router  = express.Router();
const {
  getAllHomes,
  getHomeById,
  createHome,
  updateHome,
  deleteHome,
} = require('../controllers/homeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/',       getAllHomes);
router.get('/:id',    getHomeById);
router.post('/',      protect, createHome);
router.put('/:id',    protect, updateHome);
router.delete('/:id', protect, deleteHome);

module.exports = router;
