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

const jsonRequirementsToBitArray = (app) => describe('GET /json-requirements-to-bitarrays', () => {
    it('logic is correct when valid', async () => {

        const requirements = JSON.stringify({ gas: true, commitReveal: false });
        const expected = { labelsRequired: 3, valuesRequired: 1 }

        const response = await request(app)
            .get(`/api/convert/json-requirements-to-bitarrays?mockAllLabels=${JSON.stringify(['gas', 'commitReveal'])}&requirements=${requirements}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), JSON.stringify(expected)); //for object comparison 
    });

    it('logic is correct when empty requirements', async () => {

        const requirements = JSON.stringify({});
        const expected = { labelsRequired: 0, valuesRequired: 0 }

        const response = await request(app)
            .get(`/api/convert/json-requirements-to-bitarrays?mockAllLabels=${JSON.stringify(['gas', 'commitReveal'])}&requirements=${requirements}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), JSON.stringify(expected)); //for object comparison 
    });

    it('errors out when requirements not specified', async () => {

        const expected = { labelsRequired: 3, valuesRequired: 1 }

        const response = await request(app)
            .get(`/api/convert/json-requirements-to-bitarrays?mockAllLabels=${JSON.stringify(['gas', 'commitReveal'])}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 500);
    });

    it('errors out when label does not exist', async () => {

        const requirements = JSON.stringify({ gas: true, falseTwo: false });

        const response = await request(app)
            .get(`/api/convert/json-requirements-to-bitarrays?mockAllLabels=${JSON.stringify(['gas', 'commitReveal'])}&requirements=${requirements}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 500);
    });

    it('calls contract successfully and returns correct format', async () => {
        const requirements = JSON.stringify({});

        const response = await request(app)
            .get(`/api/convert/json-requirements-to-bitarrays?requirements=${requirements}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(typeof (response.body.labelsRequired), 'number');
        assert.equal(typeof (response.body.valuesRequired), 'number')
    })


})
module.exports = [getLabelIndexMappings, jsonRequirementsToBitArray]
