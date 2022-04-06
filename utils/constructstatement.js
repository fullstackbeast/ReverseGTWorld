const { getStorage } = require('./storage.js');

module.exports = async (transactions) => {

    const openingBalance = transactions[0].TRASTATUS == "DEB" ?
        parseFloat(transactions[0].CURRENTBAL) + parseFloat(transactions[0].TRAAMT) :
        parseFloat(transactions[0].TRAAMT);

    const closingbalance = parseFloat(transactions[transactions.length - 1].CURRENTBAL);


    const totalDebit = transactions.reduce((acc, curr) => curr.TRASTATUS == "DEB" ? acc + parseFloat(curr.TRAAMT) : acc, 0);
    const totalCredit = transactions.reduce((acc, curr) => curr.TRASTATUS == "CRE" ? acc + parseFloat(curr.TRAAMT) : acc, 0);

    const statmentTransactions = transactions.map(transaction => {

        return {
            transDate: transaction.TRADATE,
            valuedate: transaction.VALDATE,
            debits: transaction.TRASTATUS == "DEB" ? transaction.TRAAMT : "",   
            credits: transaction.TRASTATUS == "CRE" ? transaction.TRAAMT : "",
            balance : transaction.CURRENTBAL,
            remarks : transaction.REMARKS,
            originatingBranch : transaction.TRABRANCH,
        }

    })

    return {
        accountNumber: getStorage().sourceAccount,
        openingBalance,
        closingbalance,
        totalCredit,
        totalDebit,
        transactions: statmentTransactions
    }

}

const getTransactionType = (transaction) => {

    return transaction.TRASTATUS;

}