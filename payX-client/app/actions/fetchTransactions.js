import fetch from 'superagent';

export const FETCH_TRANSACTION = 'FETCH_TRANSACTION';
export const FETCHING_TRANSACTION = 'FETCHING_TRANSACTION';
export const FETCH_TRANSACTION_FAILED = 'FETCH_TRANSACTION_FAILED';
export const FETCH_TRANSACTION_SUCCESSED = 'FETCH_TRANSACTION_SUCCESSED';

export const FLUSH_TRANSACTIONS = 'FLUSH_TRANSACTIONS';

const fetchTransactions = (page = 1, itemsPerPage = 10) => {
  return dispatch => {
    dispatch({
      type: FETCHING_TRANSACTION,
      data: {
        isLoading: true
      }
    });

    fetch.get('http://localhost:3000/transactions_history')
    .query({
      page: +page,
      per_page: +itemsPerPage
    })
    .end((err, data) => {
      if (data) {
        let currentPageData = JSON.parse(data.text);
        dispatch({
          type:FETCH_TRANSACTION_SUCCESSED,
          data: {
            ...{isLoading: false},
            ...currentPageData,
          },
        })
      } else {
        dispatch({
          type:FETCH_TRANSACTION_FAILED,
          data: {
            ...{isLoading: false},
            ...{error: err},
            ...{current_page: page}
          },
        })
      }
    })
  }
}

const flushTransactionCache = () => {
  return dispatch => {
    dispatch({
      type: FLUSH_TRANSACTIONS
    });
  }
}

export {fetchTransactions, flushTransactionCache};

const data = [
  {
    createdAt: new Date(),
    success: true,
    from: 'hoangtrieukhang@gmail.com',
    currency: {
      value: 'usd',
      symbol: '$'
    },
    amount: 10,
    to: '1 - someone@gmail.com',
    message: 'foo bar',
    paymentType: 'SEND', // 'SEND' or 'PAY'
  },
  {
    createdAt: new Date(),
    success: true,
    from: 'hoangtrieukhang@gmail.com',
    currency: {
      value: 'usd',
      symbol: '$'
    },
    amount: 10,
    to: '2 - someone@gmail.com',
    message: 'foo bar',
    paymentType: 'SEND', // 'SEND' or 'PAY'
  },
  {
    createdAt: new Date(),
    success: true,
    from: 'hoangtrieukhang@gmail.com',
    currency: {
      value: 'usd',
      symbol: '$'
    },
    amount: 10,
    to: '3 - someone@gmail.com',
    message: 'foo bar',
    paymentType: 'SEND', // 'SEND' or 'PAY'
  },
  {
    createdAt: new Date(),
    success: true,
    from: 'hoangtrieukhang@gmail.com',
    currency: {
      value: 'usd',
      symbol: '$'
    },
    amount: 10,
    to: '4 - someone@gmail.com',
    message: 'foo bar',
    paymentType: 'SEND', // 'SEND' or 'PAY'
  },
]
