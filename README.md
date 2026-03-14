# Scrap Recycling Station

Vue + Node.js + SQLite 构建的废品回收站信息展示平台

## 功能

- 展示回收站基本信息（名称、地址、电话）
- 展示当日废品回收价格
- 地址一键跳转地图导航
- 电话一键拨打
- 移动端优先的极简界面

## 技术栈

- 前端：Vue 3 + Vite
- 后端：Node.js + Express
- 数据库：SQLite
- 配置：JSON 文件

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动服务

```bash
# 同时启动前后端
npm run dev

# 只启动后端（端口 3000）
npm run server

# 只启动前端（端口 5173）
npm run client
```

### 访问页面

打开浏览器访问 http://localhost:5173

## 修改价格

编辑 `server/config.json` 文件：

```json
{
  "station": {
    "name": "您的回收站名称",
    "address": "您的地址",
    "phone": "您的电话",
    "latitude": 30.0,
    "longitude": 120.0
  },
  "prices": [
    { "name": "黄纸板", "unit": "斤", "price": 0.8 },
    { "name": "废铜", "unit": "斤", "price": 25.0 }
  ],
  "updateDate": "2026-03-14"
}
```

修改后重启服务即可生效。

## API

| 接口 | 方法 | 说明 |
|------|------|------|
| /api/info | GET | 获取回收站信息 |
| /api/prices | GET | 获取今日价格列表 |

## 目录结构

```
├── server/           # 后端代码
│   ├── index.js      # Express 入口
│   └── config.json   # 价格配置
├── client/           # 前端代码
│   └── src/
│       ├── App.vue   # 主页面
│       └── api.js    # API 封装
└── package.json      # 启动脚本
```

## License

MIT
