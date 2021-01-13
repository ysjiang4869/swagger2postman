const fetch = require('./fetch')

function updateCollection(uid, data) {
    fetch({
        url: '/collections/' + uid,
        method: 'PUT',
        data
    }).then(response => {
        console.log('update success')
    }).catch(err => {
        console.log('update failed' + err)
    })
}

function getCollectionId(name) {
    return fetch({
        url: '/collections',
        method: 'get'
    }).then(response => {
        let a = response.data.collections.find(ele => ele.name === name)
        if (a == null) {
            console.log('no collection with name ' + name)
            return null
        }
        console.log('collection uid is:' + a.uid)
        return a.uid
    })
}

function getCollectionDetail(uid) {
    return fetch({
        url: '/collections/' + uid,
        method: 'get'
    }).then(response => {
        return response.data
    })
}

module.exports = {
    updateCollection,
    getCollectionId,
    getCollectionDetail
}