import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import bluebird from 'bluebird';
const server = express();

function loadFile() {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve('foo')
    }, 1000);
  });
}

server.use(bodyParser.urlencoded({extended: true}));

server.post('/send_money', async (req, res) => {
  res.status(200).json({
    ...req.body,
    ...{success: true},
    ...{createdAt: new Date()}
  });
});

server.get('/transactions_history', async (req, res) => {
  res.status(200).json({
    per_page: 10,
    total_pages: 5,
    current_page: 1,
    transactions: [],
    success: true
  });
});

const port = 3000;
server.listen(port, (err) => {
  if(!err) {
    console.log(`server is start at port ${port}`);
  }
});
