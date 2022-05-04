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
                "proofs": ["www.wolframalpha.com", "www.geogebra.com", "www.chemguide.co.uk", "www.github.com"]
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