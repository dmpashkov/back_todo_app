const Task = require('../../models/task');

const getAllTasks = async (req, res) => {
  try {
    const result = await Task.find();
    res.status(200).send({ data: result })
  } catch (error) {
    res.status(400).send('Bad Request tasks not found')
    console.error('tasks not found');
  }
}

const createNewTask = async (req, res) => {
  try {
    const task = new Task({
      text: req.body.text,
      isCheck: false
    });
    const result = await task.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send('Bad Request task not saved')
    console.error('task not saved');
  }
};

const changeTaskInfo = async (req, res) => {
  try {    
    if (!req.params.hasOwnProperty('taskid')
    || req.params.taskid === '') {
      throw new Error;
    }
    const id = req.params.taskid;
    const text = req.body.text;
    const result = await Task.findOneAndUpdate(
      {_id: id},
      {$set: {text}},
      {new: true}
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send('Bad Request task not changed')
    console.error('task not changed');
  }
};

const changeTaskComplete = async (req, res) => {
  try {
    if (!req.params.hasOwnProperty('taskid')
    || req.params.taskid === '') {
      throw new Error;
    }
    const id = req.params.taskid;
    const isCheck = req.body.isCheck;
    const result = await Task.findOneAndUpdate(
      { _id: id }, { $set: { isCheck }}
      );
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send('Bad Request task not changed')
    console.error('task not changed');
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.hasOwnProperty('taskid')
    || req.params.taskid === '') {
      throw new Error;
    }
    const id = req.params.taskid;
    const result = await Task.deleteOne({ _id: id });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send('Bad Request task is not deleted')
    console.error('task is not deleted');
  }
};

const deleteAllTask = async (req, res) => {
  try {
    const result = await Task.deleteMany({})
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send('Bad Request tasks is not deleted')
    console.error('task is not deleted');
  }
};

module.exports = {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  changeTaskComplete,
  deleteTask,
  deleteAllTask
}