/**
 * 定义一个简单的loader
 * Webpack提供loader可调用的常用api及作用
 * -- this.context 当前处理的文件所在的目录，假如当前Loader处理的文件是/src/main.js，则this.context等于/src
 * -- this.resource 当前处理的文件的完整请求路径，包括querystring ，例如 src/main.js?name=***
 * -- this.resourcePath 当前处理的文件的路径，例如/src/main.js
 * -- this.resourceQuery 当前处理的文件的 querystring
 * -- this.target 等于 Webpack置中的Target
 * -- this.loadModule 但 loader 在处理一个文件时，如果依赖其他文件的处理结果才能得出当前文件的结果，就可以通过 this.loadMdule(request: string,
 *    callback function (err, source, sourceMap, module ））去获取 request对应的文件的处理结果。
 * -- this.resolve 像 require 语句一样获得指定文件的完整路径，使用方法为resolve(context: string, request: string, callback : function(err, result: string ））。
 * -- this.addDependency 为当前处理的文件添加其依赖的文件，以便其依赖的文件发生发生变化时，重新调用loader理该文件。使用方法为 addDependency(file:string ）。
 * -- this.addContextDependency 和addDependency类似，但addContextDependency是将整个目录加入当前正在处理的文件的依赖中。使用方法为 addContextDependency (directory : string ）。
 * -- this.clearDependencies 清除当前正在处理的文件的所有依赖，使用方法为clearDependencies()。
 * -- this.emitFile 输出一个文件，使用方法为 emitFile(name: string, content: Buffer I string, sourceMap: { ... ｝）。
 * loader api 官网文档地址: https://webpack.js.org/api/loaders/
 */
const loaderUtils = require('loader-utils'); 

module.exports = function (source) {
    // 获取用户为 Loader 传入的 options
    const options= loaderUtils.getOptions(this);
    // 向指定js资源源码动态注入代码
    if (this.resourcePath.indexOf(`index.js`) !== -1) {
        source = `import './date.js';\n` + source;
    }
    // source compiler 传递给 Loader 的一个文件的原内容
    // 该函数需要返回处理后的内容，这里为了简单起见，直接将原内容返回了，相当于该Loader 有做任何转换
    return source;
}