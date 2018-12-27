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

## Method illustrate
* localStorage and sessionStorage method
```
 util.store.getSession(key)  @param key, get sessionStorage(key)
 util.store.setSession(key, val)  @param (key, val) set sessionStorage(key, val)
 util.store.getLocal(key)  @param key, get localStorage(key)
 util.store.setLocal(key, val)  @param (key, val) set localStorage(key, val)
 util.store.removeSession(key) @param key, delete sessionStorage(key)
 util.store.removeLocal(key)  @param key, delete localStorage(key)
 util.store.removeSession()  delete all sessionStorage
 util.store.removeAllLocal()  delete all localStorage
 util.store.removeAllStorage() delete all localStorage and sessionStorage
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
---
参考资料： [D2-Admin](https://github.com/d2-projects/d2-admin).
