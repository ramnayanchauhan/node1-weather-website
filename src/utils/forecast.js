const request = require('request')
const forecast = (latitude,longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=03a88d0fccc983be6ae95e7916d0a228&query=${latitude},${longitude}`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
         else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        }
         else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast