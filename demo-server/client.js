var http = require("http");

http.get("http://www.imooc.com/search/hotwords", (res, req, next) => {
  // console.log(res);
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });

  res.on("end", () => {
    let result = JSON.parse(data);
    console.log('result', result);
  });
});




// http.createServer(function (req, res) {
//
// }).listen(8080, '127.0.0.1', () => {
//   console.log("服务器启动成功");
// });
