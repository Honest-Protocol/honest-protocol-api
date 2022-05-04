const axios = require('axios');

axios.get(`http://localhost:3000/api/filter/get-address`, {
    params: {
        requirements: { "label1": true, "label3": true, "label4": true }
    }
}).then(res => {
    console.log(res.data);
}).catch(err => console.log(err.response.data.message));

axios.get(`http://localhost:3000/api/convert/label-arrays-to-json`, {
    params: {
        labels: ["label1", "label2", "label3"],
        values: [true, false, true]
    }
}).then(res => {
    console.log(res.data);
}).catch(err => console.log(err.response.data.message));