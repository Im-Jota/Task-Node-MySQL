const connection = require('../config/database.js');

class Task {
  constructor(){
    this._table = 'task';
  }

  getTasks(callback){
    const select = `select * from ${this._table}`;
    connection.query(select, (error, data) => {
      if(error) callback(error, null);
      callback(null, data)
    })
  }

  setTask(task, callback){
    const insert = 'insert into task (name, state, create_at, update_at, delete_at) values (?, ?, ?, ?, ?)';
    const now = new Date();
    connection.query(insert, [task, 0, now, now, now], (error, result) => {
      if(error) {
        callback(error, null)
      } else {
        callback(null, result)
      }
    })
  }
}

module.exports = Task
