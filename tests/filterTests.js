const request = require('supertest');
const assert = require('assert');


const getFilterAddressTests = (app) => describe('GET /get', () => {
    const x = 2;
    it('filter', () => assert(x, 2));
})

const allFiltersTests = (app) => describe('GET /all', () => {

})

const getAddressTests = (app) => describe('GET /get-address', () => {

})

const getCriteriaValuesThroughFilterTests = (app) => describe('GET /get-criteria-values-through-filter', () => {

    it('logic is correct for audited tests', async () => {
        const expected = {
            'label2': true,
            'label4': false,
        };

        const response = await request(app)
            .get(`/api/filter/get-criteria-values-through-filter/0x19DcD6C445af37a811964A9125873E4D5E1bcadc/0x19DcD6C445af37a811964A9125873E4D5E1bcadc?mockData=${JSON.stringify(
                {
                    missed: 12,          // 1100
                    audits: 15,          // 1111
                    labelsRequired: 10,  // 1010; 
                    mockAllLabels: ['label1', 'label2', 'label3', 'label4']
                }
            )}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), JSON.stringify(expected)); //for object comparison 
    });

    it('unaudited misses correctly ignored', async () => {
        const expected = {
            'label1': null,
            'label2': null,
            'label3': null,
            'label4': false,
        };

        const response = await request(app)
            .get(`/api/filter/get-criteria-values-through-filter/0x19DcD6C445af37a811964A9125873E4D5E1bcadc/0x19DcD6C445af37a811964A9125873E4D5E1bcadc?mockData=${JSON.stringify(
                {
                    missed: 15,          // 1111
                    audits: 8,           // 1000
                    labelsRequired: 15,  // 1111; 
                    mockAllLabels: ['label1', 'label2', 'label3', 'label4']
                }
            )}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), JSON.stringify(expected)); //for object comparison 
    });
    /*
    it('calls contract successfully and returns correct format', async () => {
        const response = await request(app)
            .get(`/api/convert/get-label-index-mappings`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(typeof (response.body.labelToIndex), 'object');
        assert.equal(typeof (response.body.indexToLabel), 'object')
    })
    */
})

module.exports = [getCriteriaValuesThroughFilterTests]
