const request = require('supertest');
const assert = require('assert');
const { TEST_FILTER_ADDRESS, TEST_ASSET_ADDRESS, FACTORY_CONTRACT
} = require('../util/abis.js');

const getFilterAddressTests = (app) => describe('GET /get', () => {
    it('returns false if not a filter ', async () => {

        const response = await request(app)
            .get(`/api/filter/get/0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B0`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 500);
    });

    it('returns info if it is a filter ', async () => {
        const allfilters = await FACTORY_CONTRACT.methods.getAllFilters().call();
        assert.equal(typeof allfilters.length, 'number');
    });
})

const allFiltersTests = (app) => describe('GET /all', () => {
    it('correctly returns an object (array)', async () => {
        const expected = false;

        const response = await request(app)
            .get(`/api/filter/all`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(typeof (response.body), 'object');

    });
})

const getAddressTests = (app) => describe('GET /get-address', () => {
    const requirements = JSON.stringify({ gas: true })

    it('errors if filter does not exist  ', async () => {
        const response = await request(app)
            .get(`/api/filter/get-address?requirements=${requirements}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 500);

    });

    it('no params correctly reject', async () => {
        const expected = {
            message: 'request params must have a requirements field which is an object.'
        }

        const response = await request(app)
            .get(`/api/filter/get-address`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 500);
        assert.equal(JSON.stringify(response.body), JSON.stringify(expected));
    })
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
                    mockAllLabels: ['label1', 'label2', 'label3', 'label4'],
                }
            )}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), JSON.stringify(expected)); //for object comparison 
    });

    it('bad query params correctly declined', async () => {
        const expected = {
            message: 'Make sure addresses are valid.'
        };

        const response = await request(app)
            .get(`/api/filter/get-criteria-values-through-filter/bad_address/0x19DcD6C445af37a811964A9125873E4D5E1bcadc?mockData=${JSON.stringify(
                {
                    missed: 15,          // 1111
                    audits: 8,           // 1000
                    labelsRequired: 15,  // 1111; 
                    mockAllLabels: ['label1', 'label2', 'label3', 'label4']
                }
            )}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 500);
        assert.equal(JSON.stringify(response.body), JSON.stringify(expected)); //for object comparison 
    });

})

module.exports = [getCriteriaValuesThroughFilterTests, getFilterAddressTests, allFiltersTests, getAddressTests]
