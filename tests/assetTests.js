const request = require('supertest');
const assert = require('assert');

const hasAuditsTests = (app) => describe('GET /has-audits', () => {
    it('format is correct', async () => {
        const response = await request(app)
            .get(`/api/asset/has-audits/0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B0`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(typeof response.body, 'boolean');
    });

    it('errors when bad address', async () => {
        const response = await request(app)
            .get(`/api/asset/has-audits/0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 500);
    });

})

const getLabelValuesTests = (app) => describe('GET /get-label-values', () => {
    it('logic is correct when all are audited', async () => {

        const expected = JSON.stringify({ gas: false, commitReveal: true })
        const mockAllLabels = JSON.stringify(['gas', 'commitReveal']);
        const mockGetProofs = JSON.stringify(['proof1', 'proof2'])
        const mockGetLabelData = 2 //commitReveal is 1, gas is 0 

        const response = await request(app)
            .get(`/api/asset/get-label-values/0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B0
            ?mockAllLabels=${mockAllLabels}
            &mockGetProofs=${mockGetProofs}
            &mockGetLabelData=${mockGetLabelData}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), expected);
    });
    it('logic is correct when some are audited', async () => {

        const expected = JSON.stringify({ commitReveal: true })
        const mockAllLabels = JSON.stringify(['gas', 'commitReveal']);
        const mockGetProofs = JSON.stringify(['', 'proof2'])
        const mockGetLabelData = 2 //commitReveal is 1, gas is 0 

        const response = await request(app)
            .get(`/api/asset/get-label-values/0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B0?mockAllLabels=${mockAllLabels}
            &mockGetProofs=${mockGetProofs}
            &mockGetLabelData=${mockGetLabelData}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), expected);
    });

    it('logic is correct when none are audited', async () => {

        const expected = JSON.stringify({})
        const mockAllLabels = JSON.stringify(['gas', 'commitReveal']);
        const mockGetProofs = JSON.stringify([])
        const mockGetLabelData = 0

        const response = await request(app)
            .get(`/api/asset/get-label-values/0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B0?mockAllLabels=${mockAllLabels}
            &mockGetProofs=${mockGetProofs}
            &mockGetLabelData=${mockGetLabelData}`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 200);
        assert.equal(JSON.stringify(response.body), expected);
    });

    it('calls contracts successfully and returns correct format', async () => {

        const response = await request(app)
            .get(`/api/asset/get-label-values/0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B0`)
            .set('Accept', 'application/json')

        assert.equal(response.status, 200);
        assert.equal(typeof response.body, 'object');

    });

    it('errors out with bad address', async () => {

        const response = await request(app)
            .get(`/api/asset/get-label-values/0x14960B3bf418E0B33e3805d611DD4EDdDB5b43B0`)
            .set('Accept', 'application/json')
        assert.equal(response.status, 500);
        assert.equal(typeof response.body, 'object');
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