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
router.post('/new', textValidator, taskValidator, createNewTask);
router.patch('/update/:taskid', textValidator, taskValidator, changeTaskInfo);
router.patch('/complete/:taskid', isCheckValidator, taskValidator, changeTaskComplete);
router.delete('/delete/:taskid', deleteTask);
router.delete('/deleteall', deleteAllTask);

module.exports = router;