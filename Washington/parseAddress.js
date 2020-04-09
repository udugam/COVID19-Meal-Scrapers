const fetchZip = require('./fetchZip.js');

module.exports = function(rawAddressString, originalLocationText) {
    let addressArray = rawAddressString.match(/[^,]+/gm);
    let finalAddressString = ''
    if( addressArray.length === 2 ) {
        let street = addressArray[0].trim();
        let city = addressArray[1].trim();
        let zip = fetchZip(street, city);
        finalAddressString = `${street}, ${city}, ${zip}`
    } else {
        console.log("###########");
        console.log(originalLocationText);
        console.log(addressArray);
    }

    return finalAddressString;
}