const tasksRoutes = require('./routes/tasksRoutes.js');
const fs = require('fs');
const path = require('path')

function app (req, res) {
  const url = path.join(__dirname, req.url == '/' ? 'views/index.html' : req.url);
  const extname = path.extname(url);
  let contentType = 'text/html';
  switch(extname){
    case '.css':
      contentType = 'text/css';
      break;
    case 'html':
      contentType = 'application/js';
      break;
  }
  if(req.url == '/'){
    fs.readFile(url, (error, data) => {
      if(error) console.log(error)
      res.writeHead(200, {'Content-Type':contentType});
      res.write(data);
      res.end()
    })
  } else if(req.url.startsWith('/static')){
    fs.readFile(url, (error, data) => {
      if(error) console.log(error)
      res.writeHead(200, {'Content-Type':contentType});
      res.write(data);
      res.end();
    })
  }else if(req.url.startsWith('/tasks')){
    tasksRoutes(req, res)
  }
}

module.exports = app
