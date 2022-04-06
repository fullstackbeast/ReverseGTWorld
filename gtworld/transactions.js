const constants = require('../utils/constants.js');
const encrypt = require('../utils/encrypt.js');
const { getStorage } = require('../utils/storage.js');
const { post } = require('../utils/request.js');

module.exports = async (startDate, endDate) => {
    const reqdata = {
        UserId: getStorage().userId,
        SourceAccount: encrypt(getStorage().sourceAccount),
        FromDate: startDate,
        ToDate: endDate,
        AmountSearch: "",
        BeneNameSearch: "",
        AuthToken: getStorage().authToken,
        Udid: getStorage().uUid
    }

    const response = await post(constants.URLS.HISTORY, reqdata);

    const jsonResponse = JSON.parse(response);

    if(jsonResponse.StatusCode == 0){
        const message = JSON.parse(jsonResponse.Message);

        return{
            success: true,
            message: message.TRANSACTIONS.TRANSACTION
        }

    }

    return {
        success: false,
        message : "An error occoured"
    }


}