const express = require("express");
const router = express.Router();
const { LABEL_CONTRACT, FACTORY_CONTRACT } = require('../util/abis.js')
const { labelIndexMappings, sendError, sendResponse, JSONtoBitarrays } = require('../util/helpers');

router.get("/", (req, res) => {
  res.status(200).send("convert");
});

// Returns two maps:
// 1) Label-To-Index map
// 2) Index-to-Label map
// devs need this to create a new filter 
router.get("/get-label-index-mappings", async (req, res) => {
  const mockAllLabels = req.query.mockAllLabels;
  const result = await labelIndexMappings(mockAllLabels);
  sendResponse(res, result);
});

router.get('/json-requirements-to-bitarrays', async (req, res) => {
  const query = req.query;
  const mockAllLabels = req.query.mockAllLabels;
  if (!('requirements' in query)) {
    sendError(res, 'request params must have a requirements field which is an object.');
    return;
  }
  const requirements = JSON.parse(req.query.requirements);
  //convert requirements to bit arrays 
  try {
    const { labelsRequired, valuesRequired } = await JSONtoBitarrays(requirements, mockAllLabels);
    sendResponse(res, { labelsRequired, valuesRequired });
    return;
  } catch (err) {
    console.log(err);
    sendError(res, err);
    return;
  }
})

module.exports = router;
