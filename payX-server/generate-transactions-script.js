import faker from 'faker';
import fs from 'fs';
import path from 'path';

const generatePaymentType = () => {
  let paymentTypes = ['SEND', 'PAY'];
  let randomIndex = (Math.random() * paymentTypes.length);
  return paymentTypes[Math.floor(randomIndex)];
}

const generateCurrency = () => {
  let currencies = [
    {
      value: 'usd',
      displayString: 'USD',
      symbol: '$'
    },
    {
      value: 'eur',
      displayString: 'EUR',
      symbol: '€'
    },
    {
      value: 'jpy',
      displayString: 'JPY',
      symbol: '¥'
    }
  ];
  let randomIndex = (Math.random() * currencies.length);
  return currencies[Math.floor(randomIndex)];
}

const generateTransaction = () => {
  let currency = generateCurrency();
  return {
    createdAt: faker.date.past(),
    success: true,
    from: 'hoangtrieukhang@gmail.com',
    currency: {
      value: currency.value,
      symbol: currency.symbol
    },
    amount: faker.finance.amount(),
    to: faker.internet.email(),
    message: faker.lorem.sentences(),
    paymentType: generatePaymentType()
  }
}

const numberOfTransactions = 250;
let arrTransactions = [];
for (let i = 0; i < numberOfTransactions; i++) {
  arrTransactions.push(generateTransaction());
}

fs.writeFile(path.join(__dirname, 'app/data', 'transactions.json'), JSON.stringify(arrTransactions), (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
