const fetch = require('./fetch')

function updateCollection(uid, data) {
    fetch({
        url: '/collections/' + uid,
        method: 'PUT',
        data
    }).then(response => {
        console.log('update success')
    }).catch(err => {
        console.error('update failed:' + err)
    })
}

function getCollectionId(name) {
    return fetch({
        url: '/collections',
        method: 'get'
    }).then(response => {
        let a = response.data.collections.find(ele => ele.name === name)
        if (a == null) {
            console.error('no collection with name: ' + name)
            process.exit(-1);
        }
        console.log('collection uid is:' + a.uid)
        return a.uid
    }).catch(err => {
        console.error('get collection error: ' + err)
        process.exit(-1);
    })
}

function getCollectionDetail(uid) {
    return fetch({
        url: '/collections/' + uid,
        method: 'get'
    }).then(response => {
        return response.data
    }).catch(err => {
        console.error('get collection detail failed: ' + err)
        process.exit(-1);
    })
}

module.exports = {
    updateCollection,
    getCollectionId,
    getCollectionDetail
}