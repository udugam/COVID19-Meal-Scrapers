const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');
const url = 'https://www.uwkc.org/free-meals-during-school-closures/';

//import custom functions
const extractDays = require('./extractDays.js');
const extractTime = require('./extractTime.js');
const parseAddress = require('./parseAddress.js');

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
        let locations = $(this).find('p')


        // // Loop through each location
        locations.each(function() {
            let locationData = {};
            let locationText = $(this).text().split('\n');
            if( locationText.includes('TBD') !== true ) {
                if( locationText.length === 3 ) { 
                    locationData.siteName = locationText[0];
                    locationData.siteStatus = 'Open';
                    locationData.siteState = 'WA';
                    locationData.siteAddress = parseAddress(locationText[1], locationText)
                    // console.log("###########");
                    // console.log(locationData.siteAddress);
                }
            }
        })
    })
})