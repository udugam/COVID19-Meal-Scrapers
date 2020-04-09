module.exports = function(rawAddressString) {
    let addressArray = rawAddressString.match(/[^,]+/gm);
    if( addressArray.length === 2 ) {
        let street = addressArray[0].trim();
        let city = addressArray[1].trim();
    
    } else {
        console.log("###########");
        console.log(addressArray);
    }

    return `${rawAddressString}`;
}