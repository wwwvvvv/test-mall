var path = require("path");
var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer((req, res, next) => {
  res.statusCode = 200;
  // res.setHeader("Content-Type", "text/plain; charset=utf-8");
  var pathname = url.parse(req.url).pathname;
  fs.readFile(path.join(__dirname, '../' + pathname.substring(1)), function (err, data) {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      res.end('404 Error');
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(data.toString());
    }
  });
  // res.end(pathname);
}).listen(8090, '127.0.0.1', () => {
  console.log("服务器已经运行");
});
