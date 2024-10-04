const taskController = require('../controllers/TaskController.js');

function tasksRoutes(req, res){
  if(req.url === '/tasks'){
    switch(req.method){
      case 'GET':
        taskController.getAllTasks(req, res);
        break;
      case 'POST':
        taskController.setTask(req, res);
        break;
    }
  } else if (req.url.startsWith('/tasks/')) {
    switch (req.method) {
      case 'GET':
        taskController.getTask(req, res);
        break;
      case 'PUT':
        taskController.updateName(req, res);
        break;
      case 'PATCH':
        taskController.updateState(req, res);
        break;
      case 'DELETE':
        taskController.deleteTask(req, res);
    }
  }
}

module.exports = tasksRoutes
