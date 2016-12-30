var restify = require('restify');

var server = restify.createServer();

function sendV1(req, res, next) {
  console.log('sendv1 called')
  res.send('hello: ' + req.params.name);
  return next();
}

function sendV2(req, res, next) {
  console.log('sendv2 called')
  res.send({hello: req.params.name});
  return next();
}

var PATH = '/hello/:name';
server.get({path: PATH, version: '1.1.3'}, sendV1);
server.get({path: PATH, version: '2.0.0'}, sendV2);


server.on('after', (request, response, route, error) => {
  console.log('after fired');;//socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.on('request', (request, response, route, error) => {
  console.log('request fired');;//socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8080);


