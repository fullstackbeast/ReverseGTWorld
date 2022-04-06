const express = require('express');
const getTransactions = require('./gtworld/transactions.js');
const constructstatement = require('./utils/constructstatement.js');
const { login } = require('./gtworld/login.js');

const app = express()

const bodyParser = require('body-parser');


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

  if (!response.status) res.send(response);


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

})