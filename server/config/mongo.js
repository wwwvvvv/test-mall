const dbName = 'test-mall';
module.exports = {
  cookieSecret: dbName,
  db: dbName,
  url: `mongodb://admin:admin@127.0.0.1:27017/${dbName}?authSource=admin`
};
//authSource=admin 是因为数据库密码存储在了admin数据库上
