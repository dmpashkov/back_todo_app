const express = require('express');
const router = express.Router();
const taskValidator = require('../middleware/validate-middleware');
const {
  isCheckValidator,
  textValidator
} = require('../middleware/req-validate-middleware');

const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  changeTaskComplete,
  deleteTask,
  deleteAllTask
} = require('../controllers/task.controller');

router.get('/tasks', getAllTasks);
router.post('/tasks', textValidator, taskValidator, createNewTask);
router.patch('/tasks/:task_id/text', textValidator, taskValidator, changeTaskInfo);
router.patch('/tasks/:task_id/toggle', isCheckValidator, taskValidator, changeTaskComplete);
router.delete('/tasks', deleteAllTask);
router.delete('/tasks/:task_id', deleteTask);

module.exports = router;