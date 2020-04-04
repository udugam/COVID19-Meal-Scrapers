const cheerio = require('cheerio');
const request = require('request');
const url = 'https://www.uwkc.org/free-meals-during-school-closures/';

// Scrape html from url
request(url, function(error, response, html) {
    // Using cheerio to manipulate html using jquery like methods
    let $ = cheerio.load(html);

    // Select all locations in html
    let cities = $('.accordion_item');

    cities.each(function() {
        // Store city name
        let cityName = $(this).find('.accordion_item-heading').text();

        // Get multiple locations per city
        let locations = $(this).find('p')

        // Loop through each location
        locations.each(function() {
            if( $(this).find('strong').text() !== '' ) {
                let locationName = $(this).find('strong')
                if( locationName.length === 1) {
                    locationName = locationName.text()
                    console.log("###############");
                    console.log(`${cityName}, ${locationName}`)
                } else {
                    console.log("###############");
                    console.log("Multiple Locations")
                }
            }
        })
    })
    
})