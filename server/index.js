const express = require('express');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

// 中间件
app.use(express.json());

// 读取配置文件
const configPath = path.join(__dirname, 'config.json');
let config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// 初始化数据库
const dbPath = path.join(__dirname, 'data.db');
const db = new Database(dbPath);

// 创建表
db.exec(`
  CREATE TABLE IF NOT EXISTS price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    unit TEXT NOT NULL,
    price REAL NOT NULL,
    date TEXT NOT NULL
  )
`);

// API: 获取回收站信息
app.get('/api/info', (req, res) => {
  res.json({
    status: 'success',
    datum: config.station
  });
});

// API: 获取今日废品价格
app.get('/api/prices', (req, res) => {
  res.json({
    status: 'success',
    datum: {
      list: config.prices,
      updateDate: config.updateDate
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
