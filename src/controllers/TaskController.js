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

  setTask(req, res) {
    let data = '';
    req.on('data', (buffer) => {
      data += buffer.toString();
    })
    req.on('end', () => {
      const { name } = JSON.parse(data)
      this._task.setTask(name, (error, response) => {
        if (error) {
          res.writeHeader(500, {'Content-Type':'text/plain'});
          res.end(error);
        } else {
          res.statusCode = 200;
          res.end('Exito');
        }
      })
    })
  }
}


module.exports = new TaskController();
