const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');
const url = 'https://www.uwkc.org/free-meals-during-school-closures/';

//import custom functions
const extractDays = require('./extractDays.js');
const extractTime = require('./extractTime.js')

// Scrape html from url
request(url, function(error, response, html) {
    // Using cheerio to manipulate html using jquery like methods
    let $ = cheerio.load(html);

    let results = [];

    // Select all locations in html
    let cities = $('.accordion_item');

    cities.each(function() {
        // Store city name
        let cityName = $(this).find('.accordion_item-heading').text();

        // Get multiple locations per city
        let locations = $(this).find('strong')

        // // Loop through each location
        locations.each(function() {
            let locationData = {};
            if( $(this).text() !== '' ) { // This condition excludes locations that are listed 'TBD'
                locationData.siteName = $(this).text();
                locationData.siteStatus = 'Open'; // Assumed open since not listed as TBD
                locationData.siteState = 'WA';
                
                let locationDetails = $(this).parent().text().split('\n')
                for( let i = 0; i < locationDetails.length; i++) {
                    if( locationDetails[i] === locationData.siteName ) {
                        locationData.siteAddress = locationDetails[i+1];
                        locationData.daysofOperation = extractDays(locationDetails[i+2]);

                        if( locationData.daysofOperation === false) {
                            console.log("###########");
                            console.log($(this).parent().text());
                            console.log(locationDetails[i+2]);
                        }

                        break;
                    }
                }
                results.push(locationData);
                
            }
        })
    })
    
})