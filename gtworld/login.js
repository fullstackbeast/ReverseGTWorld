// import constants from '../utils/constants.js';
// import encrypt from '../utils/encrypt.js';
// import { getStorage, setStorage } from '../utils/storage.js';
// import {post} from '../utils/request.js';

const constants = require('../utils/constants.js');
const encrypt = require('../utils/encrypt.js');
const { getStorage, setStorage } = require('../utils/storage.js');
const { post } = require('../utils/request.js');

const login = async (userId, password) => {
    const form = {
        data: {
            Uuid: getStorage().uUid,
            Platform: "P",
            Model: "M",
            Manufacturer: "M",
            DeviceToken: "",
            UserId: userId,
            UserName: undefined,
            OtherParams: undefined,
            IsGAPSLite: false,
            Channel: constants.CHANNEL,
            AppVersion: constants.APPVERSION
        },
        Others: {
            UserId: userId,
            Password: password
        },
    };

    form.data.OtherParams = encrypt(form.Others);

    let res = await post(constants.URLS.LOGIN, form.data);

    let data = JSON.parse(res);

    let message = {};

    if (data.Message.indexOf("INVALID USERNAME OR PASSWORD") > -1) {
        return {
            success: false,
            message: "Invalid username or password"
        }
    }

    try {
        message = JSON.parse(data.Message);
    }
    catch (e) {
        return {
            success: false,
            message: data.Message
        }
    }



    if (message.STATUSMESSAGE.indexOf("DEVICE MISMATCH") > -1) {

        setStorage("uUid", message.DEVICE_UID);

        return await login(userId, password);
    }

    else if (message.STATUSMESSAGE.indexOf("SUCCESS") > -1) {

        setStorage("sourceAccount", message.ACCOUNTS.ACCOUNT[0].NUMBER)
        setStorage("authToken", encrypt(data.AuthToken));
        setStorage("userId", message.USERID);

        return {
            status: true,
        }
    }



    return {
        status: false,
        message: "An error occured"
    };

}

exports.login = login;

