//merge exist api and folder id
function handleIdMerge(jsonData) {
    jsonData.collection.item.forEach(folder => {
        mergeId(folder)
    })
}

//merge exist api and folder id
//folder may be just an api or a folder
function mergeId(folder) {
    if (folder.item == null) {
        //此时是单个api
        if (folder._postman_id != null) {
            folder.id = folder._postman_id
        }
        return
    }
    folder.item.forEach(api => {
        mergeId(api)
    })

}

//build Map<folderName,Map<apiName,api>> 
//for saved collection, may api also be folder, but for swagger generated
//there is only two level, so just ignore more level folder
function buildCollectionMap(jsonData) {
    apiInfo = new Map()
    apiInfo.set('x-s2p-root', new Map())
    apiInfo.set('x-s2p-folder', new Map())
    jsonData.collection.item.forEach(folder => {
        if (folder.item == null) {
            //root api
            rootApiInfo = apiInfo.get('x-s2p-root')
            rootApiInfo.set(folder.name, folder)
            apiInfo.set('x-s2p-root', rootApiInfo)
            return
        }
        //save folder info also
        folderMap = apiInfo.get('x-s2p-folder')
        folderMap.set(folder.name, folder)
        folder.item.forEach(api => {
            folderInfo = apiInfo.get(folder.name) || new Map()
            folderInfo.set(api.name, api)
            apiInfo.set(folder.name, folderInfo)
        })
    })
    var apiObj = new Map()
    apiInfo.forEach((value, key) => {
        apiObj.set(key, Object.fromEntries(value))
    })
    // return Object.fromEntries(apiObj)
    return apiInfo
}

function merge(savedJsonData, newJsonData) {
    newApiInfo = buildCollectionMap(newJsonData)
    var mergedJsonData = {}
    mergedJsonData.collection = Object.assign({}, savedJsonData.collection);
    mergedJsonData.collection.item = []
    savedJsonData.collection.item.forEach(folder => {
        if (folder.item == null) {
            //root api
            newApiInfo.get('x-s2p-root').delete(folder.name)
            //already exist, save old
            mergedJsonData.collection.item.push(folder)
            return
        }
        
        newFolder = Object.assign({}, folder);
        newFolder.item=[]
        mergedJsonData.collection.item.push(newFolder)
        folder.item.forEach(api => {
            if(newApiInfo.has(folder.name)){
                newApiInfo.get(folder.name).delete(api.name)
            }
            newFolder.item.push(api)
        })
        //process current folder new add api
        if(newApiInfo.has(folder.name)){
            newApiInfo.get(folder.name).forEach((api,name)=>{
                newFolder.item.push(api)
            })
        }
        newApiInfo.delete(folder.name)
        newApiInfo.get('x-s2p-folder').delete(folder.name)
    })
    //process new add root api
    newApiInfo.get('x-s2p-root').forEach((api,name)=>{
        mergedJsonData.collection.item.push(api)
    })
    newApiInfo.delete('x-s2p-root')
    //process new add folder
    newApiInfo.get('x-s2p-folder').forEach((folder,name)=>{
        mergedJsonData.collection.item.push(folder)
    })

    handleIdMerge(mergedJsonData)
    return mergedJsonData;
}

module.exports = {merge}