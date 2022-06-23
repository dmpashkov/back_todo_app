const Task = require('../../models/task');

const getAllTasks = (req, res) => {
  try {
    Task.find().then(result => {
      res.status(200).send({ data: result });
    }).catch(err => {
      res.status(400).send('Bad Request')
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const createNewTask = (req, res) => {
  try {
    const task = new Task(req.body);
    task.save().then(result => {
      res.status(200).send(result);
    })
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const changeTaskInfo = (req, res) => {
  try {
    const id = req.body._id;
    Task.findOneAndUpdate({ _id: id }, req.body).then(result => {
      res.status(200).send(result);
    }).catch(err => {
      res.status(400).send('Bad Request')
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const changeTaskComplete = (req, res) => {
  try {
    const id = req.body._id;
    Task.findOneAndUpdate({ _id: id }, req.body).then(result => {
      res.status(200).send(result);
    }).catch(err => {
      res.status(400).send('Bad Request')
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const deleteTask = (req, res, next) => {
  try {
    const id = req.query._id;
    Task.deleteOne({ _id: id }).then(result => {
      res.status(200).send(result);
    }).catch(err => {
      res.status(400).send('Bad Request')
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const deleteAllTask = (req, res, next) => {
  try {
    Task.deleteMany({}).then(result => {
      res.status(200).send(result);
    }).catch(err => {
      res.status(400).send('Bad Request')
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
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