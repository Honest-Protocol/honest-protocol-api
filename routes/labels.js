const express = require("express");
const router = express.Router();
const { sendResponse } = require('../util/helpers');
const { LABEL_CONTRACT } = require('../util/abis');
// const db = require("../lib/database.js");

// request is /api/user

router.get("/", (req, res) => {
    res.status(200).send("labels");
});

router.get("/is-valid/:labelName", async (req, res) => {
    const label = req.params.labelName;

    const allLabels = await LABEL_CONTRACT.methods.getAllLabels().call();

    if (allLabels.indexOf(label) > -1) {
        sendResponse(res, true);
        return;
    } else {
        sendResponse(res, false);
        return;
    }
});

router.get("/all", async (req, res) => {
    const labels = await LABEL_CONTRACT.methods.getAllLabels().call();
    sendResponse(res, labels);
});

module.exports = router;
