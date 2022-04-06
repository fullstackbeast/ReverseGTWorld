var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');


exports.getStorage = () => {
    return {
        authToken: localStorage.getItem('authToken') || '',
        uUid: localStorage.getItem('uUid') || "8E5187463676DAAA",
        userId: localStorage.getItem('userId') || '',
        sourceAccount: localStorage.getItem('sourceAccount') || '',
        authToken :  localStorage.getItem('authToken') || ''
    }
}

exports.setStorage = (key, value) => {
    localStorage.setItem(key, value);
}

exports.resetStorage = () => {
    localStorage.clear();
}