const express = require('express');
const dataController = require('../controllers/data-controller');
const router = express.Router();

router.post('/', dataController.createData);
router.get('/', dataController.getAllData);
router.get('/:userId', dataController.getDataById);
router.delete('/:dataId', dataController.deleteData);
router.patch('/:dataId', dataController.updateData);
module.exports = router;
