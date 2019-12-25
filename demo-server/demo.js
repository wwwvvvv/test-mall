var http = require('http');

http.createServer((req, res, next) => {
  res.statusCode = 200;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  

  res.end('hello node.js');
 // console.log('res', res);
}).listen(8090, '127.0.0.1', () => {
//127.0.0.1 ——> 本机
  console.log("服务器已经运行");
});
