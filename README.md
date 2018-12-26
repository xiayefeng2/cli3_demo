# cli3_demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
----
## Method illustrate
### localStorage and sessionStorage method
``` html
 util.getSession(key)  @param key, 获取 sessionStorage(key)
 util.setSession(key, val)  @param (key, val) 设置 sessionStorage(key, val)
 util.getLocal(key)  @param key, 获取 localStorage(key)
 util.setLocal(key, val)  @param (key, val) 设置 localStorage(key, val)
 util.removeSession(key) @param key, 删除 sessionStorage(key)
 util.removeLocal(key)  @param key, 删除 localStorage(key)
 util.removeSession()  删除所有 sessionStorage
 util.removeAllLocal()  删除所有 localStorage
 util.removeAllStorage() 删除所有 localStorage 和 sessionStorage
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

参考资料： [D2-Admin](https://github.com/d2-projects/d2-admin).
