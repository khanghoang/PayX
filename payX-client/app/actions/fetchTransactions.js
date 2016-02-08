import fetch from 'superagent';

export const FETCH_TRANSACTION = 'FETCH_TRANSACTION';
export const FETCHING_TRANSACTION = 'FETCHING_TRANSACTION';
export const FETCHING_TRANSACTION_FAILED = 'FETCHING_TRANSACTION_FAILED';
export const FETCHING_TRANSACTION_SUCCESSED = 'FETCHING_TRANSACTION_SUCCESSED';

const fetchTransactions = () => {
  return dispatch => {
    dispatch({
      type: FETCHING_TRANSACTION,
      data: {
        isLoading: true
      }
    });

    setTimeout(() => {
      dispatch({
        type:FETCHING_TRANSACTION_SUCCESSED,
        data: data,
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
