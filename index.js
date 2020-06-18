const express = require('express');

const app = express();

// 静态文件
app.use(express.static('public')); // express 

app.listen(9999, () => console.log('server start at 127.0.0.1:9999')); // express 