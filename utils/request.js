const fetch = require('node-fetch');


exports.post = async (url, data) => {

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const d = await response.json();

        return d;

    } 
    catch (e) {
        console.log(e);
    }
}