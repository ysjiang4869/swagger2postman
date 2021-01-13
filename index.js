#!/usr/bin/env node
const stp = require('swagger2-to-postmanv2')
const collection = require('./lib/collection')
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
var config_modle = require('config')
config=config_modle.util.loadFileConfigs(__dirname + '/config/')
const fetch = require('./lib/fetch')
const fs = require('fs')
const json_merger = require('json-merger')

const program = require('commander')
program.version('1.0.0')
    .option('-s --service <service>', 'which service to convert')
    .option('-r --replace [repliaces]', 'comma split api name which will replace not merge')
    .parse(process.argv)


var service_config = config[program.service]
var url = service_config.url
var collection_name = service_config.collection_name

//run update
update().catch(err => {
    console.error("run failed," + err)
})

//get swagger json
function getSwaggerJson(url) {
    return fetch({
        url: url,
        methods: 'get'
    }).then(response => {
        return response.data
    })
}

//merge exist api and folder id
function handleIdMerge(jsonData) {
    jsonData.collection.item.forEach(folder => {
        folder.item.forEach(api => {
            if (api._postman_id != null) {
                api.id = api._postman_id
            }
        })
        if (folder._postman_id != null) {
            folder.id = folder._postman_id
        }
    })
}

async function update() {
    var swaggerJson = await getSwaggerJson(url)
    swaggerJson['info'] = {
        'title': collection_name,
        'description': collection_name + ' api',
        'version': '1.0.0',
        '_postman_id': '807bb824-b333-4b59-a6ef-a8d46d3b95bf'
    }
    var inputData = {
        'type': 'json',
        'data': swaggerJson
    }

    stp.convert(inputData, { 'folderStrategy': 'Tags' }, async (_a, res) => {
        if (res.result === false) {
            console.log('convert failed')
            console.log(res.reason)
            return
        }
        var convert_json = res.output[0].data

        var id = await collection.getCollectionId(collection_name)
        if (id === null) {
            return
        }
        var body = {
            'collection': {
                'info': {
                    'name': collection_name,
                    'description': collection_name + ' api',
                    '_postman_id': id,
                    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"

                },
                "item": convert_json.item
            }
        }
        var saved = await collection.getCollectionDetail(id)
        var merged = json_merger.mergeObjects([body, saved])
        handleIdMerge(merged)
        collection.updateCollection(id, merged)
    })
}