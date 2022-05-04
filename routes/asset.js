const express = require("express");
const router = express.Router();
const { sendResponse, sendError, bitarraysToJSON } = require('../util/helpers.js');
const { LABEL_CONTRACT } = require('../util/abis');
// const db = require("../lib/database.js");

// request is /api/asset/....

router.get("/get-label-values/:asset", async (req, res) => {
  const assetAddress = req.params.asset;
  if (!assetAddress) {
    sendError(res, 'please supply an asset address.');
    return;
  }

  try {
    const proofs = await LABEL_CONTRACT.methods.getProofs(assetAddress).call();
    const labelData = Number(await LABEL_CONTRACT.methods.getLabelData(assetAddress).call());
    let auditedBitarray = 0;
    for (let i = proofs.length - 1; i >= 0; i--) {
      auditedBitarray <<= 1;
      let proof = proofs[i];
      if (proof.length > 0) {
        //has been audited. 
        auditedBitarray += 1;
      }
    }
    const result = await bitarraysToJSON(auditedBitarray, labelData);
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
    const proofs = await LABEL_CONTRACT.methods.getProofs(assetAddress).call();
    if (proofs.length) {
      sendResponse(res, true);
      return;
    }
    sendResponse(res, false);
  }
  catch (err) {
    sendError(res, 'invalid asset address.');
  }

});


module.exports = router;
