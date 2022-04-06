const express = require('express');
const encrypt = require('./utils/encrypt.js');
const constants = require('./utils/constants.js');
const getTransactions = require('./gtworld/transactions.js');
const constructstatement = require('./utils/constructstatement.js');
const { login } = require('./gtworld/login.js');

const app = express()

const bodyParser = require('body-parser');
const transactions = require('./gtworld/transactions.js');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/statement', async (req, res) => {

  console.log(req.body);

  let { userId, password, startDate, endDate } = req.body;

  if (!userId || !password || !startDate || !endDate) {
    res.send({
      status: false,
      message: "Please provide userId, password, startDate and endDate "
    })

    return;
  }

  let response = await login(userId, password);
  // let response = await login("23278534701", "08053810200");

  if (!response.status) res.send(response);

  // FromDate: '01/01/2022',
  // ToDate: '03/03/2022',

  let transactions = await getTransactions(startDate, endDate);

  if (!response.status) res.send(response);

  if (transactions.message.length == 0) {
    res.send({
      status: true,
      message: "No transactions within this period found"
    })
  }

  const statement = await constructstatement(transactions.message);

  res.send({
    status: true,
    statement
  })

})

app.listen(port, async () => {

  console.log(`Example app listening on port ${port}`)

  // let response = await login("23278533709", "98053810900");
})