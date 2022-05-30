const request = require('supertest');
const assert = require('assert');

const isValidTests = (app) => describe('GET /is-valid', () => {

    it('valid label name correctly validated', async () => {
        const expected = true;

        const response = await request(app)
            .get(`/api/labels//is-valid/label1`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), JSON.stringify(expected)); //for object comparison 

    });

    it('invalid label name correctly invalidated', async () => {
        const expected = false;

        const response = await request(app)
            .get(`/api/labels/is-valid/garbagelabelnameabcdefg123456`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), JSON.stringify(expected)); //for object comparison 

    });
})

const allTests = (app) => describe('GET /all', () => {
    it('correctly returns an object (array)', async () => {
        const expected = false;

        const response = await request(app)
            .get(`/api/labels/all`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(typeof (response.body), 'object');

    });
})

module.exports = [isValidTests, allTests];