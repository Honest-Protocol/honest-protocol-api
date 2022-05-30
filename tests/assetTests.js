const request = require('supertest');
const assert = require('assert');
const express = require('express');

const hasAuditsTests = (app) => describe('GET /has-audits', () => {
    it('format is correct', async () => {
        const response = await request(app)
            .get(`/api/asset/has-audits?asset=0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B0`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(typeof response.body, 'boolean');
    });

    it('errors when bad address', async () => {
        const response = await request(app)
            .get(`/api/asset/has-audits?asset=0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 500);
    });
    it('errors when no parameter', async () => {
        const response = await request(app)
            .get(`/api/asset/has-audits`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 500);
    });
})

const getLabelValuesTests = (app) => describe('GET /get-label-values', () => {
    it('format is correct', async () => {

        const expected = { gas: true, commit: false }

        const response = await request(app)
            .get(`/api/asset/has-audits?asset=0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B0`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(typeof response.body, 'boolean');
    });
})

const getAllTests = (app) => describe('GET /all', () => {
    it('format is correct', async () => {

        const response = await request(app)
            .get(`/api/asset/all`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(typeof response.body.length, 'number'); //it's an array 
    });
})

module.exports = [hasAuditsTests, getLabelValuesTests, getAllTests]