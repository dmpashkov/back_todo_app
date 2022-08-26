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
router.post('/tasks/new', textValidator, taskValidator, createNewTask);
router.patch('/tasks/:taskid/update', textValidator, taskValidator, changeTaskInfo);
router.patch('/tasks/:taskid/complete', isCheckValidator, taskValidator, changeTaskComplete);
router.delete('/tasks/:taskid/delete', deleteTask);
router.delete('/tasks/deleteall', deleteAllTask);

module.exports = router;