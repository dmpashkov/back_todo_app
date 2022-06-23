const express = require('express');
const router = express.Router();
const taskValidator = require('../middleware/validate-middleware');

const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  changeTaskComplete,
  deleteTask,
  deleteAllTask
} = require('../controllers/task.controller');

router.get('/allTasks', getAllTasks);
router.post('/createTask', taskValidator, createNewTask);
router.patch('/updateTask', taskValidator, changeTaskInfo);
router.patch('/completeTask', taskValidator, changeTaskComplete);
router.delete('/deleteTask', deleteTask);
router.delete('/deleteAllTask', deleteAllTask);

module.exports = router;