const express = require("express");
const router = express.Router();
const { sendResponse,
    sendError,
    getFilterInfo,
    JSONtoBitarrays,
    isValidAddress,
    getJSONFilterResults,
    isFilter
} = require('../util/helpers.js');
const { FACTORY_CONTRACT, } = require('../util/abis.js')


router.get("/get/:filterAddress", async (req, res) => {
    const { filterAddress } = req.params;
    if (!filterAddress || !isValidAddress(filterAddress)) {
        sendError(res, 'Invalid input filter address.');
        return;
    }
    if (!await isFilter(filterAddress)) {
        sendError(res, { filterExists: false, msg: `filter does not exist at address ${filterAddress}.` });
        return;
    }
    const { requirements, name } = await getFilterInfo(filterAddress);
    sendResponse(res, {
        filterExists: true, msg: {
            requirements,
            name,
        }
    })
});

router.get("/all", async (req, res) => {
    const filters = await FACTORY_CONTRACT.methods.getAllFilters().call();
    const result = await Promise.all(filters.map(async filter => {
        const { requirements, name } = await getFilterInfo(filter)
        return {
            address: filter,
            requirements,
            name
        }
    }))
    sendResponse(res, result);
});

router.get("/get-address", async (req, res) => {
    //body of request must contain a json of requirements, such as {labelname1: true, labelname2: false}
    const query = req.query;
    if (!('requirements' in query)) {
        sendError(res, 'request params must have a requirements field which is an object.');
        return;
    }
    const requirements = JSON.parse(req.query.requirements);
    //convert requirements to bit arrays 
    try {
        const { labelsRequired, valuesRequired } = await JSONtoBitarrays(requirements);
        const addr = await FACTORY_CONTRACT.methods.getFilterAddress(labelsRequired, valuesRequired).call();
        if (addr == '0x0000000000000000000000000000000000000000') {
            throw 'filter with given requirements does not exist yet.'
        }
        console.log(addr);
        sendResponse(res, addr);
        return;
    } catch (err) {
        console.log(err);
        sendError(res, err);
        return;
    }
});

router.get('/get-criteria-values-through-filter/:asset/:filter', async (req, res) => {
    const { asset, filter } = req.params;
    if (!asset || !filter) {
        sendError(res, 'please supply both an asset address and a filter address.');
        return;
    }
    if (!isValidAddress(asset) || !isValidAddress(filter)) {
        sendError(res, 'Make sure addresses are valid.');
        return;
    }
    const mockData = req.query.mockData;
    if (!mockData) {
        if (!(await isFilter(filter))) {
            sendError(res, 'Make sure filter address is the address of a real filter.');
            return;
        }
    }

    if (mockData) {
        const json = await getJSONFilterResults(asset, filter, mockData)
        sendResponse(res, json);
    } else {
        const json = await getJSONFilterResults(filter, asset);
        sendResponse(res, json);
    }

})

module.exports = router;
