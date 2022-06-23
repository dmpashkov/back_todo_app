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
    const task = new Task(req.body);
    const result = await task.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send('Bad Request task not saved')
    console.error('task not saved');
  }
};

const changeTaskInfo = async (req, res) => {
  try {
    const id = req.body._id;
    const result = await Task.findOneAndUpdate({ _id: id }, req.body)
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send('Bad Request task not changed')
    console.error('task not changed');
  }
};

const changeTaskComplete = async (req, res) => {
  try {
    const id = req.body._id;
    const result = await Task.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send('Bad Request task not changed')
    console.error('task not changed');
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const id = req.query._id;
    const result = await Task.deleteOne({ _id: id });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send('Bad Request task is not deleted')
    console.error('task is not deleted');
  }
};

const deleteAllTask = async (req, res, next) => {
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