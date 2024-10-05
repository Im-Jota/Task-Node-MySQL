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

  getTask(id, callback) {
    const select = `select * from ${this._table} where id = ${id}`;
    connection.query(select, (error, data) => {
      if (error) callback(error, null);
      callback(null, data);
    })
  }

  updateName(task, id, callback) {
    const update = 'update task set name = ?, update_at = ? where id = ?';
    const now = new Date();
    connection.query(update, [task, now, id], (error, data) => {
      if (error) callback(error, null);
      callback(null, data);
    })
  }

  updateState(state, id, callback){
    const update = 'update task set state = ? where id = ?';
    connection.query(update, [state, id], (error, data) => {
      if(error) callback(error, null);
      callback(null, data);
    })
  }

  deleteTask(id, callback){
    const deleteT = `delete from ${this._table} where id = ${id}`;
    connection.query(deleteT, (error, data) => {
      if(error) callback(error, null);
      callback(null, data);
    })
  }
}

module.exports = Task
