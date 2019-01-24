## 配置
```sh
# 复制一份环境变量
cp .env .env.local
```
- 本地修改`.env.local`的`BASE_URL`来切换代理服务器

## 运行前端开发环境命令

```sh
# 安装
npm i

# 开启本地服务并实时编译
npm run serve

# 生产模式编译
npm run build

# eslint
npm run lint
```

# 安装 vue-cli 插件

`npx @vue/cli add xxxx`

可选插件
- `npx @vue/cli add electron-builder` [electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)
- `npx @vue/cli add apollo` [GraphQL](https://github.com/Akryum/vue-cli-plugin-apollo)
- `npx @vue/cli add @akryum/ssr` [ssr](https://github.com/nklayman/vue-cli-plugin-electron-builder)

# 注意事项

- 为避免组件过于复杂，不方便后期维护，避免往组件传数组且在组件里循环
- 基于js语言特性，应避免选择节点过长的变量
