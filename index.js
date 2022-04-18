const express = require('express');
const app = express();

class Placeholder_LabelContract {

  constructor() {
    console.log("Setting up Placeholder_LabelContract...");

    this.labelInfo = {
      "nfthash1": {
        "labelValues": 12,
        "proofs": ["www.google.com", "www.facebook.com", "www.apple.com", "www.netflix.com"]
      },
      "nfthash2": {
        "labelValues": 7,
        "proofs": ["www.wolframalpha.com","www.geogebra.com", "www.chemguide.co.uk", "www.github.com"]
      }
    }

    this.whiteListedAuditors = {
      "amagibaba": true
    }
  }

  getLabel(nfthash) {
    return this.labelInfo[nfthash];
  }

  addWhitelistAuditor(auditor_address) {
    this.whiteListedAuditors[auditor_address] = true;
  }
}

// API End-points
// ======================================================
app.get('/', (req, res) => {
  res.send(200, "Hello World. This is the Express app's home page (no users will see this ).")
});

// Example data-fetching endpoint
app.get('/api/get-label/:nfthash', (req, res) => {
  labelData = phlc.getLabel(req.params.nfthash);
  labelString = JSON.stringify(labelData);
  res.send(200, `Label of nft of hash ${labelString}: 72`);
})

// Example data-modifying endpoint
app.get('/api/add-whitelisted-auditor/:auditoraddress', (req, res) => {
  auditor_address = req.params.auditoraddress;
  phlc.addWhitelistAuditor(auditor_address);
  res.send(200, `Address ${auditor_address} is now a whitelisted auditor.`)
})


// App deployment
// ======================================================
phlc = new Placeholder_LabelContract();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})