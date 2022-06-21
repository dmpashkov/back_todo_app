const Task = require('../../models/task');
const { validationResult } = require('express-validator');

getAllTasks = (req, res) => {
  Task.find().then(result => {
    res.status(200).send({ data: result });
  }).catch(err => res.status(404).send(err));
};

createNewTask = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw { status: 422 };
  } else {
    const task = new Task(req.body);
    task.save().then(result => {
      res.status(200).send(result);
    })
  }
};

changeTaskInfo = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw { status: 422 };
  } else {
    Task.updateOne({ _id: req.body._id }, req.body).then(result => {
      Task.find({ _id: req.body._id }).then(result => {
        res.status(200).send(result);
      }).catch(err => res.status(404).send(err));
    }).catch(err => res.status(404).send(err));
  }
};

changeTaskComplete = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw { status: 422 };
  } else {
    Task.updateOne({ _id: req.body._id }, req.body).then(result => {
      Task.find({ _id: req.body._id }).then(result => {
        res.status(200).send(result);
      }).catch(err => res.status(404).send(err));
    }).catch(err => res.status(404).send(err));
  }
};

deleteTask = (req, res, next) => {
  Task.deleteOne({ _id: req.query._id }).then(result => {
    res.status(200).send(result);
  }).catch(err => res.status(404).send(err));
};

deleteAllTask = (req, res, next) => {
  Task.deleteMany({}).then(result => {
    res.status(200).send(result);
  }).catch(err => res.status(404).send(err));
};

module.exports.getAllTasks = getAllTasks;
module.exports.createNewTask = createNewTask;
module.exports.changeTaskInfo = changeTaskInfo;
module.exports.changeTaskComplete = changeTaskComplete;
module.exports.deleteTask = deleteTask;
module.exports.deleteAllTask = deleteAllTask;