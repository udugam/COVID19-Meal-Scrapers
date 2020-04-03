const cheerio = require('cheerio');
const request = require('request');
const url = 'https://www.uwkc.org/free-meals-during-school-closures/';

// Scrape html from url
request(url, function(error, response, html) {
    // Using cheerio to manipulate html using jquery like methods
    let $ = cheerio.load(html);

    // Select all locations in html
    // let locations = $( '.accordion_item-text' ).find( 'p' )
    let elements = $( '.page_section_title').text();

    console.log(elements);
    
    // // Loop through each location
    // locations.each( function( index, element) {
    //     element.children.forEach( function(child, index) {
    //         if( child.name === 'strong' ) {
    //             console.log("Location Name: ", child.children[0].data);
    //         }
    //     })
    // })
    
})