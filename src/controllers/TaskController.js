const Task = require('../models/TaskModel.js');

class TaskController{
  constructor(){
    this._task = new Task();
  }

  getAllTasks(req, res){
    this._task.getTasks((error, data) => {
      if(error) console.log(error);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(data));
      res.end();
    })
  }
}


module.exports = new TaskController();
