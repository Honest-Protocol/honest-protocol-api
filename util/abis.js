const Web3 = require('web3');

// Contract Interface Code
// =========================================================
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://eth-rinkeby.alchemyapi.io/v2/M5kkVgbGSQxEIVtJ_dDNW6UAK5WJ0I3Q'));

// =============================================================================
//         ABIs and Contract Addresses: Paste Your ABIs/Addresses Here
// =============================================================================
// Label Contract
const LABEL_ADDRESS = '0xc06B5aF0Ab576D0Da417edD03747Bb668bBfb9d5';
const LABEL_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "filterFactoryAddress",
                "type": "address"
            }
        ],
        "name": "FilterFactoryCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "asset",
                "type": "address"
            }
        ],
        "name": "NewAuditedAsset",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "labelName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "labelIndex",
                "type": "uint256"
            }
        ],
        "name": "NewLabelAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_newLabel",
                "type": "string"
            }
        ],
        "name": "addLabel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newAuditor",
                "type": "address"
            }
        ],
        "name": "addWhitelistAuditor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            }
        ],
        "name": "auditedLabels",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "audited",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_label",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "_labelValue",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "_labelProof",
                "type": "string"
            }
        ],
        "name": "editLabelData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "labelName",
                "type": "string"
            },
            {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
            },
            {
                "internalType": "bool[]",
                "name": "newValues",
                "type": "bool[]"
            },
            {
                "internalType": "string[]",
                "name": "proofs",
                "type": "string[]"
            }
        ],
        "name": "editLabelForMultipleAssets",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            },
            {
                "internalType": "string[]",
                "name": "labelsToChange",
                "type": "string[]"
            },
            {
                "internalType": "bool[]",
                "name": "newValues",
                "type": "bool[]"
            },
            {
                "internalType": "string[]",
                "name": "proofs",
                "type": "string[]"
            }
        ],
        "name": "editMultipleLabelsForAsset",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllLabels",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            }
        ],
        "name": "getLabelData",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "labelIndex",
                "type": "uint256"
            }
        ],
        "name": "getLabelOfAsset",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "labelName",
                "type": "string"
            }
        ],
        "name": "getLabelOfAsset",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_label",
                "type": "string"
            }
        ],
        "name": "getProof",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            }
        ],
        "name": "getProofs",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_label",
                "type": "string"
            }
        ],
        "name": "labelExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "labelIndices",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "whiteListedAuditors",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Factory Contract
const FACTORY_ADDRESS = '0x56C60C4cb6942071F241cd773FBA67E2b9026FbC';
const FACTORY_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "labelContractAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "labelsRequired",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "valuesRequired",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "newFilter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "FilterCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "allFilters",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "labelsRequired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "valuesRequired",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "createFilter",
        "outputs": [
            {
                "internalType": "address",
                "name": "newFilterAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllFilters",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "filters",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "getFilterAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "labelsRequired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "valuesRequired",
                "type": "uint256"
            }
        ],
        "name": "getMissedCriteria",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "misses",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "labelContract",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Factory Contract
const FILTER_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "assetAddress",
                "type": "address"
            }
        ],
        "name": "assetPassesFilter",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "factory",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "assetAddress",
                "type": "address"
            }
        ],
        "name": "getMissedCriteria",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_labelsRequired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_valuesRequired",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_labelContract",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "labelsRequired",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "valuesRequired",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const LABEL_CONTRACT = new web3.eth.Contract(LABEL_ABI, LABEL_ADDRESS);
const FACTORY_CONTRACT = new web3.eth.Contract(FACTORY_ABI, FACTORY_ADDRESS);

module.exports = {
    LABEL_CONTRACT,
    FACTORY_CONTRACT,
    FILTER_ABI,
    web3
}
