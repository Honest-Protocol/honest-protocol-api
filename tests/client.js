const axios = require('axios');

axios.get(`http://localhost:3000/api/filter/get-address`, {
    params: {
        requirements: { "label1": true, "label3": true, "label4": true }
    }
}).then(res => {
    console.log(res.data);
}).catch(err => console.log(err));