# 关于
这个项目用于存放第三方依赖库, 比如 golang 包或者 npm 包. 为了解决这些问题:
* cr 打包时, 每次都从上游拉取依赖, 太费时.
* 控制第三方依赖的更新.
* 不需要将第三方包放到本项目内.

# 用法
以 deepin-manual 为例来说明.
deepi-manual 前端页面, 依赖了十几个 npm 包.

## 创建项目分支
在本项目中创建对应的项目分支:
```
cd /PATH/TO/vendor-deps
git checkout master
git checkout -b deepin-manual
```

## 创建依赖
package.json 内容如下:
```json
{
	"devDependencies": {
		"babel-core": "^6.26.0",
		"babel-preset-env": "^1.6.1",
		"babel-preset-react": "^6.24.1",
		"babelify": "^8.0.0",
		"browserify": "^14.5.0",
		"gulp": "^3.9.1",
		"gulp-concat": "^2.6.1",
		"gulp-rename": "^1.2.2",
		"gulp-sass": "^3.1.0",
		"marked": "^0.3.7",
		"md5": "^2.2.1",
		"react": "^16.2.0",
		"react-dom": "^16.2.0",
		"react-router-dom": "^4.2.2",
		"vinyl-buffer": "^1.0.1",
		"vinyl-source-stream": "^2.0.0"
	},
	"dependencies": {
		"gulp": "^3.9.1"
	}
}
```

然后拉取这些包:
```shell
npm install
```

最后, 将所有更新保存到git树:
```shell
git add node_modules/ package.json
git commit -m "deepin-manual: Init package deps"
git push -u origin deepin-manual
```
最终将本地的 `deepin-manual` 分支推送到服务器上去.

## 在自己项目中加入 submodule

```
cd /PATH/TO/deepin-manual
git submodule add https://cr.deepin.io/vendor-deps src/web/node_modules
git submodule update --init --recursive
git submodule update --remote
```