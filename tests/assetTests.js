const request = require('supertest');
const assert = require('assert');
const express = require('express');

const hasAuditsTests = (app) => describe('GET /has-audits', () => {

})

const getLabelValuesTests = (app) => describe('GET /get-label-values', () => {

})

const getLabelDataAndProofsTests = (app) => describe('GET /get-label-data-and-proofs', () => {

})

module.exports = [hasAuditsTests, getLabelValuesTests, getLabelDataAndProofsTests]