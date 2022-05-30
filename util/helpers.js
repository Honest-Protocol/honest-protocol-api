const Web3 = require('web3');
const { LABEL_CONTRACT, web3, FILTER_ABI, FACTORY_CONTRACT, LABEL_ADDRESS } = require('../util/abis.js')
const { MockLabelContract } = require('../tests/mockContracts');

function sendResponse(res, msg) {
    res.status(200).send(msg);
}

function sendError(res, errorMsg) {
    res.status(500).send({ message: errorMsg });
}

//////////// ADDRESSES ///////////////

function isValidAddress(address) {
    let validity = Web3.utils.isAddress(address)
    return validity;
}

function normalizeAddress(addr) {
    if (typeof addr != 'string') throw 'input must be a string';
    return addr.toLowerCase();
}

/////////// CONVERSIONS /////////////

const bitarraysToJSON = async (labelsBits, valuesBits) => {
    if (isNaN(labelsBits) || isNaN(valuesBits)) throw "inputs must be numbers.";
    labelsBits = Number(labelsBits);
    valuesBits = Number(valuesBits);
    const { indexToLabel } = await labelIndexMappings();
    const requirements = {};
    for (let i = 0; labelsBits > 0; labelsBits >>= 1, valuesBits >>= 1, i++) {
        if (labelsBits % 2 == 1) {
            const valueRequired = valuesBits % 2 ? true : false;
            requirements[indexToLabel[String(i)]] = valueRequired;
        }
    }
    return requirements;

}

const getJSONFilterResults = async (filter, nft, mockData = undefined) => {

    let mockParsed = mockData ? JSON.parse(mockData) : undefined;
    const filterContract = getFilterContract(filter);
    let missed = mockData ? mockParsed.missed : await filterContract.methods.getMissedCriteria(nft).call();
    let audits = mockData ? mockParsed.audits : await LABEL_CONTRACT.methods.auditedLabels(nft).call();
    let labelsRequired = mockData ? mockParsed.labelsRequired : await filterContract.methods.labelsRequired().call();
    const { indexToLabel } = await labelIndexMappings(JSON.stringify(mockParsed.mockAllLabels));
    const results = {};

    for (let i = 0; labelsRequired > 0; missed >>= 1, labelsRequired >>= 1, audits >>= 1, i++) {
        if (labelsRequired % 2 == 1) {
            //required 
            const label = indexToLabel[String(i)];
            if (missed % 2 == 0) {
                // passed
                results[label] = true;
            } else if (missed % 2 == 1 && audits % 2 == 1) {
                // missed 
                results[label] = false;
            } else {
                // not audited
                results[label] = null;

            }
        }
    }
    return results;
}

const JSONtoBitarrays = async (requirements, mockAllLabels = undefined) => {
    const { labelToIndex } = await labelIndexMappings(mockAllLabels);

    let labelsRequired = 0;
    let valuesRequired = 0;
    for (const [label, value] of Object.entries(requirements)) {
        if (!(label in labelToIndex)) throw 'label is not valid';
        if (typeof (value) != 'boolean') throw 'values must be boolean';
        const index = labelToIndex[label];
        const mask = 1 << index;
        labelsRequired |= mask;
        if (value) {
            valuesRequired |= mask;
        }
    }
    return { labelsRequired, valuesRequired };
}

const labelIndexMappings = async (mockAllLabels = undefined) => {

    let label_list = mockAllLabels ? JSON.parse(mockAllLabels) : await LABEL_CONTRACT.methods.getAllLabels().call();
    // Build label_to_index and index_to_label
    let label_to_index = {};
    let index_to_label = {};
    for (let i = 0; i < label_list.length; i++) {
        label_to_index[label_list[i]] = i;
        index_to_label[i] = label_list[i];
    }

    return {
        labelToIndex: label_to_index,
        indexToLabel: index_to_label  // Keys get turned into strings when sent.
    }
}

///////////////// FILTERS /////////////////////

const getFilterContract = (addr) => {
    const filter = new web3.eth.Contract(FILTER_ABI, addr);
    return filter;
}

const getFilterInfo = async (addr) => {
    addr = normalizeAddress(addr);
    const filter = getFilterContract(addr);
    const labelsRequired = await filter.methods.labelsRequired().call();
    const valuesRequired = await filter.methods.valuesRequired().call();
    const name = await filter.methods.name().call();
    const requirements = await bitarraysToJSON(labelsRequired, valuesRequired);
    return { requirements, name };
}

const isFilter = async (addr) => {
    const reqAddr = normalizeAddress(addr);
    const filters = (await FACTORY_CONTRACT.methods.getAllFilters().call()).map(a => normalizeAddress(a));
    if (filters.indexOf(reqAddr) < 0) {
        return false;
    }
    return true;
}

module.exports = {
    isValidAddress,
    sendError,
    normalizeAddress,
    sendResponse,
    getFilterInfo,
    isFilter,
    getFilterContract,
    labelIndexMappings,
    JSONtoBitarrays,
    bitarraysToJSON,
    getJSONFilterResults,
}