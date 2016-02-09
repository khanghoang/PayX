import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import bluebird from 'bluebird';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const server = express();

const loadFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        resolve(err);
      } else {
        resolve(data);
      }
    });
  });
}

const paginate = (arrData, page, itemsPerPage = 10) => {
  let transactions = _.filter(arrData, (item, idx) => {
    return Math.floor(idx / itemsPerPage) + 1 === page;
  });

  let totalPages = Math.ceil(arrData.length / itemsPerPage);

  return {
    current_page: page,
    total_pages: +totalPages,
    transactions: transactions,
    per_page: +itemsPerPage,
    success: true
  };
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

  let page = _.get(req, 'query.page', 0);
  let itemsPerPage = _.get(req, 'query.per_page', 10);

  let transactions = await loadFile(path.join(__dirname, '../app/data', 'transactions.json'));

  if (transactions instanceof Error) {
    res.status(500).json({
      success: false,
      message: 'Error when loading transactions',
      codeMessage: transactions.toString()
    });
    return;
  }

  res.status(200).json(paginate(JSON.parse(transactions), +page, +itemsPerPage));
});

const port = 3000;
server.listen(port, (err) => {
  if(!err) {
    console.log(`server is start at port ${port}`);
  }
});
