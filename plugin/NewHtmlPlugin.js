/**
 * 自定义的功能同html-webpack-plugin的插件
 */

const fs = require('fs');
const cheerio = require('cheerio');

function NewHtmlPlugin (options) {
    this.options = options;
}

NewHtmlPlugin.prototype.apply = function (compiler) {
    let initParams = this.options;
    let { template, filename } = initParams;
    compiler.plugin('compilation', function (compilation, callback) {
        compilation.plugin('finishModules', function () {
            console.log('l啦啦啦啦啦')
        })
    })
    compiler.plugin('emit', function (compilation, callback) {
        let jsNameList = [];
        let cssNameList = [];
        compilation.chunks.forEach((chunk) => {
            chunk.files.forEach((filename) => {
                if (filename.indexOf('.js') != -1) {
                    jsNameList.push(filename)
                }
                if (filename.indexOf('.css') != -1) {
                    cssNameList.push(filename)
                }
            })
        })
        // 根据html模板输出新的html
        fs.readFile(template, (err, data) => {
            if (err) { return console.error(err) }
            let htmlContent = data.toString();
            let $ = cheerio.load(htmlContent);
            let html = $('html'); 
            let head = $('head')
            // 动态生成js
            jsNameList.forEach((filename) => {
                html.append(`<script src="${filename}"></script>`) 
            })
            // 动态生成css
            cssNameList.forEach((filename) => {
                head.append(`<link href="${filename}">`)
            })
            html = $.html();
            compilation.assets[filename] = {
                source: () => {
                    return html;
                },
                size: () => {
                    return Buffer.byteLength(html, 'utf8'); 
                }
            }
            callback()
        })
    })
}

module.exports = NewHtmlPlugin;