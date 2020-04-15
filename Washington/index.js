require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');
const url = 'https://www.uwkc.org/free-meals-during-school-closures/';
const delay = require('delay');

//import custom functions
const extractDays = require('./extractDays.js');
const extractTime = require('./extractTime.js');
const parseAddress = require('./parseAddress.js');
const extractZip = require('./extractZip.js');


// Scrape html from url
request(url, async function(error, response, html) {
    // Using cheerio to manipulate html using jquery like methods
    let $ = cheerio.load(html);

    let results = [];

    // Select all locations in html
    let cities = $('.accordion_item');

    // Loop through cities
    for( let i = 0; i < cities.length; i++) {
        // Store city name
        let cityName = $(cities[i]).find('.accordion_item-heading').text();

        // Get multiple locations per city
        let locations = $(cities[i]).find('p')
        
        // Loop through each location
        for( let i = 0; i < locations.length; i++) {
            let locationData = {};
            let locationText = $(locations[i]).text().split('\n');
            if( locationText.includes('TBD') !== true ) {
                if( locationText.length === 3 ) { 
                    // locationData.siteName = locationText[0];
                    // locationData.siteStatus = 'Open';
                    // locationData.siteState = 'WA';
                    // locationData.siteAddress = await parseAddress(locationText[1], cityName, locationText);
                    // locationData.siteZip = extractZip(locationData.siteAddress);
                    // locationData.daysofOperation = extractDays(locationText[2]);
                    // locationData.lunchTime = extractTime(locationText[2]);
                    
                }
            }
        }
    }
    
    

})