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

  getTask(req, res) {
    const id = parseInt(req.url.split('/')[2]);
    this._task.getTask(id, (error, data) => {
      if(error) console.log(error);
      res.writeHeader(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(data));
    })
  }

  updateName(req, res) {
    let data = '';
    const id = req.url.split('/')[2];
    req.on('data', (buffer) => {
      data += buffer.toString();
    });
    req.on('end', () => {
      const { name } = JSON.parse(data);
      this._task.updateName(name, id, (error, data) => {
        if (error) {
          res.statusCode = '500';
          res.setHeader('Content-Type', 'text/plain');
          res.write(error);
        } else {
          res.writeHeader(200, {'Content-Type': 'text/plain'});
          res.end('Exito')
        }
      })
    })
  }

  updateState(req,res) {
    let data = '';
    const id = req.url.split('/')[2];
    req.on('data', (buffer) => {
      data += buffer.toString();
    });
    req.on('end', () => {
      const { state } = JSON.parse(data);
      this._task.updateState(state, id, (error, data) => {
        if (error) {
          res.statusCode = '500';
          res.setHeader('Content-Type', 'text/plain');
          res.write(error);
        } else {
          res.writeHeader(200, {'Content-Type': 'text/plain'});
          res.end('Exito')
        }
      })
    })
  }

  deleteTask(req, res) {
    const id = req.url.split('/')[2];
    this._task.deleteTask(id, (error, data) => {
      if(error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.write(error);
      } else {
        res.writeHeader(200, {'Content-Type': 'text/plain'});
        res.end('exito');
      }
    })
  }
}


module.exports = new TaskController();
