const delay = require('delay');

const test = async function() {
    for( let i = 0; i < 50; i++) {
        await delay(500)
        console.log(Date.now());
    }
}

test();