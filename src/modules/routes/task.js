const express = require('express');
const router = express.Router();
const reqChecker = require('../lib/validate-midlware');

const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  changeTaskComplete,
  deleteTask,
  deleteAllTask
} = require('../controllers/task.controller');

router.get('/allTasks', getAllTasks);
router.post('/createTask', reqChecker, createNewTask);
router.patch('/updateTask', reqChecker, changeTaskInfo);
router.patch('/completeTask', reqChecker, changeTaskComplete);
router.delete('/deleteTask', deleteTask);
router.delete('/deleteAllTask', deleteAllTask);

module.exports = router;