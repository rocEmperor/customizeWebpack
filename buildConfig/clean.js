var path = require('path')
var rimraf = require('rimraf')

// 清空 public
// rimraf.sync(path.join(__dirname, '../public'))
// window 使用sync会报ENOTEMPTY错 ，默认maxBusyTries是3，改为10
rimraf(path.join(__dirname, '../public'), { maxBusyTries: 10 }, function () {})