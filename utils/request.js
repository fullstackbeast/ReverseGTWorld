const axios = require('axios').default;


exports.post = async (url, data) => {

    try {
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     });

        const d = await axios.post(url, data);

        return d.data;

    } 
    catch (e) {
        console.log(e);
    }
}