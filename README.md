# UPDATE POSTMAN COLLECTION FROM SWAGGER


This tools can update postman collection from swagger json, to avoid create every time.

> Note: The tools will merge old config with new, but for request body, it will keep the exist one, not merge.

### Use
1. Clone this repository

2. Install packages

    Make sure you have install nodejs. Then in project root folder, run `npm install` to install libs.

3. Get your postman api key  
   Just open [this link](https://web.postman.co/settings/me/api-keys) in your broswer, and generate your api key.

4. Set api key as environment.  
    Copy `.env.sample` to `.env` file, then set the api key you get in the previous step.
    
5. Rename `config/default-example.json` file to `config/default.json` and edit like bellow
   ```json
   {       
        "test":{
            "collection_name":"test import",
            "url":"http://127.0.0.1:8085/v2/api-docs"
        }
    }
   ```
    The key is command line value name.`collection_name` is the postman collection name you want to update. `url` is your swagger url.

6. Run update  
    In project root folder, open command line and run `node index.js -s test`  
    you can also install as gloabl cli. run `sudo npm link` in root folder, then use `apih -s test` everywhere!

### TODO

- ~~Merge same name collection~~

### Reference

1. [openapi-to-postman/OPTIONS.md at develop · postmanlabs/openapi-to-postman](https://github.com/postmanlabs/openapi-to-postman/blob/develop/OPTIONS.md)
2. [Update Collection - Postman Public Workspace](https://www.postman.com/postman/workspace/postman-public-workspace/request/12959542-a42a1615-4b04-44e9-b2ea-e94729d5f4d6)
3. [axios - npm](https://www.npmjs.com/package/axios)
4. [postmanlabs/swagger2-postman2: Module and library to convert Swagger 2.0 to a Postman Collection (v2.0)](https://github.com/postmanlabs/swagger2-postman2)
5. [boschni/json-merger: Merge JSON files and objects with indicators like $import $remove $replace $merge](https://github.com/boschni/json-merger)

