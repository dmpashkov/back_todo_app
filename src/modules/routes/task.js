const express = require('express');
const router = express.Router();
const {check} = require('express-validator');


const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  changeTaskComplete,
  deleteTask,
  deleteAllTask
} = require('../controllers/task.controller');

router.get('/allTasks', getAllTasks);
router.post('/createTask', [
  check('text').exists().not().isEmpty()
], createNewTask);
router.patch('/updateTask', [
  check('text').exists().not().isEmpty()
], changeTaskInfo);
router.patch('/completeTask', [
  check('isCheck').exists().not().isEmpty()
], changeTaskComplete);
router.delete('/deleteTask', deleteTask);
router.delete('/deleteAllTask', deleteAllTask);

module.exports = router;