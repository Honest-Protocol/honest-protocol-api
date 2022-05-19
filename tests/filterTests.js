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

})

module.exports = [getFilterAddressTests, allFiltersTests, getAddressTests, getCriteriaValuesThroughFilterTests]
