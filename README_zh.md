# 从Swagger更新Postman收藏夹

这个工具可以从Swagger JSON更新Postman收藏夹，以避免每次都要创建。

>注意：该工具将旧配置与新配置合并，但是对于请求正文，它将保留已有的而不是合并。

### 使用
1. 克隆该仓库

2. 安装包

    确保您已安装Node.js。然后，在项目根目录中运行“npm install”以安装库。

3. 获取您的Postman API密钥  
   在您的浏览器中打开[此链接](https://web.postman.co/settings/me/api-keys)，并生成您的API密钥。

4. 将API密钥设置为环境变量。  
    将`.env.sample`复制到`.env`文件中，然后设置在上一步中获取的API密钥。
    
5. 将`config/default-example.json`文件重命名为`config/default.json`，并按如下所示进行编辑
   ```json
   {       
        "test":{
            "collection_name":"test import",
            "url":"http://127.0.0.1:8085/v2/api-docs"
        }
    }
   ```
    键是命令行值名称。`collection_name`是您要更新的Postman收藏夹名称。`url`是您的Swagger URL。

6. 运行更新  
    在项目根目录中，打开命令行并运行`node index.js -s test`  
    您还可以将其安装为全局CLI。在根文件夹中运行`sudo npm link`，然后在任何地方使用`apih -s test`！

### TODO

- ~~合并同名收藏夹~~

### 参考资料

1. [openapi-to-postman/OPTIONS.md at develop · postmanlabs/openapi-to-postman](https://github.com/postmanlabs/openapi-to-postman/blob/develop/OPTIONS.md)
2. [Update Collection - Postman Public Workspace](https://www.postman.com/postman/workspace/postman-public-workspace/request/12959542-a42a1615-4b04-44e9-b2ea-e94729d5f4d6)
3. [axios - npm](https://www.npmjs.com/package/axios)
4. [postmanlabs/swagger2-postman2: Module and library to convert Swagger 2.0 to a Postman Collection (v2.0)](https://github.com/postmanlabs/swagger2-postman2)
5. [boschni/json-merger: Merge JSON files and objects with indicators like $import $remove $replace $merge](https://github.com/boschni/json-merger)

