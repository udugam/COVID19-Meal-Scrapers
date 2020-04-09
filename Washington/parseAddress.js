const fetchZip = require('./fetchZip.js');
const parser = require('parse-address'); // US Address parser

module.exports = function(rawAddressString, cityName, originalLocationText) {
    let parsedAddress = parser.parseLocation(rawAddressString)
    let finalAddressString;
    if( parsedAddress !== null ) {
        if( parsedAddress.zip === undefined && parsedAddress.street !== undefined && parsedAddress.number !== undefined) {
            parsedAddress.zip = fetchZip(parsedAddress.street, parsedAddress.city)
        } 
        finalAddressString = `${parsedAddress.number} ${parsedAddress.street} ${parsedAddress.type}, ${parsedAddress.city || cityName}, WA ${parsedAddress.zip}`
        console.log(finalAddressString);
    } else {
        console.log("Raw String: ",rawAddressString)
    }

    return finalAddressString;
}