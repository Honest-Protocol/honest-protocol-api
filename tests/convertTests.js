const assert = require('assert');


const request = require('supertest');


const getLabelIndexMappings = (app) => describe('GET /get-label-index-mappings', () => {

    it('logic is correct', async () => {

        const expected = { labelToIndex: { 'gas': 0, 'commitReveal': 1 }, indexToLabel: { 0: 'gas', 1: 'commitReveal' } };

        const response = await request(app)
            .get(`/api/convert/get-label-index-mappings?mockAllLabels=${JSON.stringify(['gas', 'commitReveal'])}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), JSON.stringify(expected)); //for object comparison 
    });

    it('calls contract successfully and returns correct format', async () => {
        const response = await request(app)
            .get(`/api/convert/get-label-index-mappings`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(typeof (response.body.labelToIndex), 'object');
        assert.equal(typeof (response.body.indexToLabel), 'object')
    })
})

const labelArraysToJson = (app) => describe('GET /label-arrays-to-json', () => {

})

const jsonRequirementsToBitArray = (app) => describe('GET /json-requirements-to-bitarrays', () => {

})
module.exports = [getLabelIndexMappings, labelArraysToJson, jsonRequirementsToBitArray]
