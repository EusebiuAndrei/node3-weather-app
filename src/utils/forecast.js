const request = require('request')

// Forecasting
// Lat/Long -> Weather

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/771e424c0fd4c6e00bfe09d8bca18b08/${latitude},${longitude}?units=us&lang=en`

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services!')
        } else if(body.error) {
            callback('Unable to find location!')
        } else {
            const {currently : dataCurrently} = body
            const {data: dataDaily} = body.daily
            callback(undefined, `${dataDaily[0].summary} It is currently ${dataCurrently.temperature} degrees out. There is a ${dataCurrently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast