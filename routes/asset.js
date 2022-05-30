const express = require("express");
const router = express.Router();
const { sendResponse, sendError, bitarraysToJSON, normalizeAddress, isValidAddress } = require('../util/helpers.js');
const { LABEL_CONTRACT } = require('../util/abis');
// const db = require("../lib/database.js");

// request is /api/asset/....

router.get("/get-label-values/:asset", async (req, res) => {
  const assetAddress = req.params.asset;
  let { mockGetProofs, mockGetLabelData, mockAllLabels } = req.query;
  if (!assetAddress) {
    sendError(res, 'please supply an asset address in the query parameters.');
    return;
  }
  try {
    const proofs = mockGetProofs ? JSON.parse(mockGetProofs) : await LABEL_CONTRACT.methods.getProofs(assetAddress).call();

    const labelData = mockGetLabelData ? JSON.parse(mockGetLabelData) : Number(await LABEL_CONTRACT.methods.getLabelData(assetAddress).call());
    let auditedBitarray = 0;

    for (let i = proofs.length - 1; i >= 0; i--) {
      auditedBitarray <<= 1;
      let proof = proofs[i];
      if (proof.length > 0) {
        //has been audited. 
        auditedBitarray += 1;
      }
    }

    const result = await bitarraysToJSON(auditedBitarray, labelData, mockAllLabels);
    sendResponse(res, result);
  }
  catch (err) {
    sendError(res, 'invalid asset address.');
  }
});

router.get("/has-audits/:asset", async (req, res) => {
  const assetAddress = req.params.asset;
  if (!assetAddress) {
    sendError(res, 'please supply an asset address.');
    return;
  }

  try {
    const audited = await LABEL_CONTRACT.methods.auditedLabels(assetAddress).call();
    if (audited > 0) {
      sendResponse(res, true);
      return;
    }
    sendResponse(res, false);
  }
  catch (err) {
    sendError(res, 'invalid asset address.');
  }

});

router.get('/all', async (req, res) => {
  const audited = await LABEL_CONTRACT.getPastEvents('NewAuditedAsset', { fromBlock: 0, toBlock: 'latest' });
  const addresses = audited.map(({ returnValues }) => returnValues.asset)
  sendResponse(res, addresses);
})


module.exports = router;
