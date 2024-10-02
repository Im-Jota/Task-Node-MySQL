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
}

module.exports = Task
