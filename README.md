# Go SPA start kit

基于 Go gin web framework 的前端项目，前端项目文件夹为 `public`， 采用 webpack 编译


### 使用

运行前端项目：

```bash
cd public && pnpm run start
```

编译前端项目：

```bash
pnpm run build:dev
pnpm run build:prod
```

运行 Go：

```bash
go run ./main.go
```

编译 Go:

```bash
go build ./main.go
```

Go 使用 `embed` 将编译后的前端项目打包成单一文件，便于分发和部署。

### 本地开发

前端通过 webpack 的 assets 插件生成 `entrypoints` 静态资源文件列表，Gin 解析 `entrypoints` 文件列表，并在服务端渲染 `index.html`，并加载静态资源，
通过 Go proxy 反向代理 API 解决跨域问题，Gin 提供全面的后端操作能力，不仅适合做 BFF 层服务也适合 full stack 项目。

## License
Distributed under the MIT License. See `LICENSE` for more information.
