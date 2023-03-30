const axios = require('axios')
function fetch(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: 'https://api.getpostman.com',
            timeout: 180000,
            headers: { 'X-Api-Key': process.env.POSTMAN_API_KEY },
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
        });
        instance(options)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                if(error.response){
                    reject(error.response.data.error.message)
                }else{
                    reject(error.message)
                }
            })
    })
}
module.exports = fetch
