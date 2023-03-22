const axios = require('axios')
function fetch(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: 'https://api.getpostman.com',
            timeout: 180000,
            headers: { 'X-Api-Key': process.env.POSTMAN_API_KEY }
        });
        instance(options)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
module.exports = fetch
