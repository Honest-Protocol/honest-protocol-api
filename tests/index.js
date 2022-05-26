const { app } = require('../index');
const assetTests = require('./assetTests');
const convertTests = require('./convertTests');
const labelsTests = require('./labelsTests');
const filterTests = require('./filterTests');


function main() {

    // Set up our backend
    assetTests.map(test => test(app));

    filterTests.map(test => test(app));

    convertTests.map(test => test(app));

    labelsTests.map(test => test(app));

}


main();