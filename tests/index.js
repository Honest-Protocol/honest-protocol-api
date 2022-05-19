const { createApp } = require('../index');
const assetTests = require('./assetTests');
const convertTests = require('./convertTests');
const labelsTests = require('./labelsTests');
const filterTests = require('./filterTests');


function main() {

    const app = createApp();
    // Set up our backend
    assetTests.map(test => test(app));

    filterTests.map(test => test(app));

    convertTests.map(test => test(app));

    labelsTests.map(test => test(app));

}


// it('should send back a JSON object with goodCall set to true', function () {
//     request(app)
//         .get('/index')
//         .set('Content-Type', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, function (err, res) {
//             if (err) { return done(err); }
//             callStatus = res.body.goodCall;
//             expect(callStatus).to.equal(true);
//             // Done
//             done();
//         });
// });

main();