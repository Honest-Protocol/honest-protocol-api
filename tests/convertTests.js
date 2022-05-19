const assert = require('assert');
const request = require('supertest');

const getLabelIndexMappings = (app) => describe('GET /get-label-index-mappings', () => {
    const x = 1;
    it('sample', () => assert(x, 1));

})

const labelArraysToJson = (app) => describe('GET /label-arrays-to-json', () => {

})

const jsonRequirementsToBitArray = (app) => describe('GET /json-requirements-to-bitarrays', () => {

})
module.exports = [getLabelIndexMappings, labelArraysToJson, jsonRequirementsToBitArray]
