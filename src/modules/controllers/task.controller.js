const Task = require('../../models/task');

module.exports.getAllTasks = (req, res, next) => {
  Task.find().then(result => {
    res.send({data: result});
  }).catch(err => res.send(err));
};

module.exports.createNewTask = (req, res, next) => {
  const task = new Task(req.body);
  task.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));
};

module.exports.changeTaskInfo = (req, res, next) => {
  Task.updateOne({_id: req.body._id}, req.body).then(result => {
    Task.find({_id: req.body._id}).then(result => {
      res.send(result);
    }).catch(err => res.send(err));
  }).catch(err => res.send(err));
};

module.exports.deleteTask = (req, res, next) => {
  Task.deleteOne({_id: req.query._id}).then(result => {
    res.send(result);
  }).catch(err => res.send(err));
};

module.exports.deleteAllTask = (req, res, next) => {
  Task.deleteMany({}).then(result => {
    res.send(result);
  }).catch(err => res.send(err));
};