const request = require('request')

// Geocoding
// Address -> Lat/Long

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWlrZS1jcmV0dSIsImEiOiJjanlyZDl5MTcwMWo5M2VtcWdjNDd2Z2duIn0.4YLd5NvG5dE4_S2cEyetGQ&limit=1`

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length == 0) {
            callback('Unable to find location. Try another search.')
        } else {
            const {features} = body
            const data = features[0]
            const [longitude, latitude] = data.center
            callback(undefined, {
                latitude,
                longitude,
                location: data.place_name
            })
        }
    })
}

module.exports = geocode