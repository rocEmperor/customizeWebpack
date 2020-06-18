/**
 * Webpack 事件流说明(Webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果)
 * Webpack 的事件流机制应用了观察者模式，和 Node扣中的 EventEmitter 非常相似，可以直接在 Compiler Compilation 对象上广播和监昕事件，方法如下：
 * 事件触发：compiler.apply ('event-name', params); 【event-name 为事件名称，params 为附带的参数】
 * 事件注册：compiler.plugin('event-name', function(params) {})
 * Compiler和Compilation(它们是 Pluginh和Webpack之间的桥梁。 Compiler和Compilation 的含义如下。)
 *  -- Compiler 对象包含了 Webpack 环境的所有配置信息，包含 options loaders plugins等信息。这个对象在 Webpack 启动时被实例化，
 *     它是全局唯一的，可以简单地将它理解为 Webpack 实例。
 *  -- Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack以开发模式运行时，每当检测到一个文件发生变化，便有一次新的 
 *     Compilation创建 Compilation 对象也提供了很多事件回调供插件进行扩展。通过 Compilation也能读取到 Compiler 对象。
 * 常用事件:
 * 1.emit事件: emit 事件发生时，代表源文件的转换和组装己经完成，在这里可以读取到最终将输出的资源、代码块、模块及其依赖，并且可以修改输出资源的内容.
 * 
 */

function Note (options) {
    this.options = options;
}

Note.prototype.apply = function (compiler) {
    console.log(this.options, '---- 0')
    console.log('开始执行插件 --- 1')
    compiler.plugin('compile', function (compilation, callback) {
        console.log('webpack 编译器开始编译 --- 2')
    })
    
    compiler.plugin('compilation', function (compilation, callback) {
        console.log('编译器开始一个新的编译任务 --- 3')
        compilation.plugin('optimize', function () {
            console.log('编译器开始优化文件 --- 4')
        })
    })
    compiler.plugin('emit', function (compilation, callback) {
        compilation.chunks.forEach((chunk) => {
            chunk.forEachModule((module) => {
                // console.log(module.fileDependencies, 'module')
                // module.fileDependencies.forEach((filepath) => {

                // })
            })
            chunk.files.forEach(function (filename) {
                // compilation assets 存放当前即将输出的所有资源，调用一个输出资源的 source（）方法能获取输出资源的内容
                if (filename == 'bundle.js') {
                    let source = compilation.assets[filename].source();
                    let fileContent = `/******/ console.log('我是note插入的内容'); eval("console.log('啦啦啦')"); \n${source}`;
                    compilation.assets[filename] = {
                        source: () => {
                            return fileContent
                        },
                        size: () => {
                            return Buffer.byteLength(fileContent, 'utf8'); 
                        }
                    }
                }
            })
        })
        // 注意：这是 个异步事件，要记得调用 callback 来通知 Webpack 本次事件监听处理结束，如果忘记了调用 callback
        // ，则 Webpack 将一直卡在这里而不会往后执行
        callback()
    })
    compiler.plugin('done', function (compilation, callback) {
        console.log('打包完成 --- 5')
    })
}

module.exports = Note;