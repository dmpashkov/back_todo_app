const express = require('express');
const router = express.Router();
const taskValidator = require('../middleware/validate-middleware');
const {
  isCheckValidator,
  textValidator
} = require('../middleware/register-schema');

const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  changeTaskComplete,
  deleteTask,
  deleteAllTask
} = require('../controllers/task.controller');

router.get('/allTasks', getAllTasks);
router.post('/createTask', textValidator, taskValidator, createNewTask);
router.patch('/updateTask', textValidator, taskValidator, changeTaskInfo);
router.patch('/completeTask', isCheckValidator, taskValidator, changeTaskComplete);
router.delete('/deleteTask', deleteTask);
router.delete('/deleteAllTask', deleteAllTask);

module.exports = router;