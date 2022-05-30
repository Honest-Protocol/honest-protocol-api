const axios = require('axios');

/*axios.get(`https://api-dev.honestprotocol.xyz/api/filter/get-address`, {
    params: {
        requirements: { "label1": true, "label3": true, "label4": true }
    }
}).then(res => {
    console.log(res.data);
}).catch(err => console.log(err.response.data.message));


axios.get(`https://api-dev.honestprotocol.xyz/api/asset/has-audits/0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B0`, {

}).then(res => {
    console.log(res.data);
}).catch(err => console.log(err.response.data.message));

axios.get(`https://api-dev.honestprotocol.xyz/api/asset/get-label-values/0xf4960B3bf418E0B33E3805d611DD4EDdDB5b43B0`, {
}).then(res => {
    console.log(res.data);
}).catch(err => console.log(err.response.data.message));


axios.get(`https://api-dev.honestprotocol.xyz/api/asset/all`, {
}).then(res => {
    console.log(res.data);
}).catch(err => console.log(err.response.data.message));
*/
axios.get(`https://api-dev.honestprotocol.xyz/api/convert/label-arrays-to-jsons`, {
    params: {
        requirements: { "label1": true, "label3": true, "label4": true }
    }
}).then(res => {
    console.log(res.data);
}).catch(err => console.log(err.response.data.message));

// axios.get(`https://api-dev.honestprotocol.xyz/api/convert/label-arrays-to-json`, {
//     params: {
//         labels: ["label1", "label2", "label3"],
//         values: [true, false, true]
//     }
// }).then(res => {
//     console.log(res.data);
// }).catch(err => console.log(err.response.data.message)); 