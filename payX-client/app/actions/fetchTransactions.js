import fetch from 'superagent';

export const FETCH_TRANSACTION = 'FETCH_TRANSACTION';
export const FETCHING_TRANSACTION = 'FETCHING_TRANSACTION';
export const FETCH_TRANSACTION_FAILED = 'FETCH_TRANSACTION_FAILED';
export const FETCH_TRANSACTION_SUCCESSED = 'FETCH_TRANSACTION_SUCCESSED';

const fetchTransactions = () => {
  return dispatch => {
    dispatch({
      type: FETCHING_TRANSACTION,
      data: {
        isLoading: true,
        transactions: []
      }
    });

    setTimeout(() => {
      dispatch({
        type:FETCH_TRANSACTION_SUCCESSED,
        data: {
          isLoading: false,
          transactions: [
            ...data,
            ...data,
            ...data,
          ]
        },
      })
      return;
    }, 3000);
  }
}

export {fetchTransactions};

const data = [
  {
    createdAt: new Date(),
    success: true,
    from: 'hoangtrieukhang@gmail.com',
    currency: 'usd',
    amount: 10,
    to: '1 - someone@gmail.com',
    message: 'foo bar',
    paymentType: 'SEND', // 'SEND' or 'PAY'
  },
  {
    createdAt: new Date(),
    success: true,
    from: 'hoangtrieukhang@gmail.com',
    currency: 'usd',
    amount: 10,
    to: '2 - someone@gmail.com',
    message: 'foo bar',
    paymentType: 'SEND', // 'SEND' or 'PAY'
  },
  {
    createdAt: new Date(),
    success: true,
    from: 'hoangtrieukhang@gmail.com',
    currency: 'usd',
    amount: 10,
    to: '3 - someone@gmail.com',
    message: 'foo bar',
    paymentType: 'SEND', // 'SEND' or 'PAY'
  },
  {
    createdAt: new Date(),
    success: true,
    from: 'hoangtrieukhang@gmail.com',
    currency: 'usd',
    amount: 10,
    to: '4 - someone@gmail.com',
    message: 'foo bar',
    paymentType: 'SEND', // 'SEND' or 'PAY'
  },
]
