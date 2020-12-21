# 从postman更新swagger collection


该工具用于请求服务获得swagger json，并更新postman collection，取代默认import每次创建新的collection。

> 注意：本工具会在旧的collection基础上合并新的，但是对于requestbody，会保持旧的，不会更新

### Use
1. 克隆本项目

2. 安装依赖

    确认安装了nodejs。在项目根目录，执行`npm install`安装相关以来

3. 获得你的postman api key  
    在postman中，点击你的账户，选择账户设置，会打开postman账户相关网页，在账户的设置中生成api-key。

4. 设置 api key 作为环境变量  
    例如: `export POSTMAN_API_KEY=${you key}` 

    也可以编辑～/.bashrc 或者~/.zshrc设置环境变量。

5. 编辑 `config/default.json` 文件，新增如下内容
   ```
   {
        "test":{
            "collection_name":"test import",
            "url":"http://127.0.0.1:8085/v2/api-docs"
        }
    }
   ```
   json的key是命令行参数，用于区分不同的服务，可以给自己的服务取一个别名。 `collection_name`是postman集合的名称，请确保同名的集合只有一个。url是获取swagger的url，请求改url应该返回swagger2的json在response body中。

6. 使用  

    在项目根目录，打开命令行，执行`node index.js -s test`  即可更新对应collection_name的集合。

    你也可以将本服务安装为全局命令，在根目录执行`sudo npm link` ，之后可以在任何地方执行`apih -s xxx`更新你的api～

### TODO

- ~~Merge same name collection~~

### Reference

1. [openapi-to-postman/OPTIONS.md at develop · postmanlabs/openapi-to-postman](https://github.com/postmanlabs/openapi-to-postman/blob/develop/OPTIONS.md)
2. [Update Collection - Postman Public Workspace](https://www.postman.com/postman/workspace/postman-public-workspace/request/12959542-a42a1615-4b04-44e9-b2ea-e94729d5f4d6)
3. [axios - npm](https://www.npmjs.com/package/axios)
4. [postmanlabs/swagger2-postman2: Module and library to convert Swagger 2.0 to a Postman Collection (v2.0)](https://github.com/postmanlabs/swagger2-postman2)
5. [boschni/json-merger: Merge JSON files and objects with indicators like $import $remove $replace $merge](https://github.com/boschni/json-merger)

