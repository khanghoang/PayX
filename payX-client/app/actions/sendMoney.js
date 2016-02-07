import fetch from 'superagent';
// import nock from 'nock';

export const SENDING_MONEY = 'SENDING_MONEY';

// nock.post('http://localhost:3000/send_money', {
//   amount: 10,
//   from: 'hoangtrieukhang@gmail.com',
//   to: 'foo@bar.com',
//   type: 'SEND',
//   currency: 'usd'
// })
// .reply(200, {
//   foo: 'bar'
// });

const sendMoney = (data) => {
  return dispatch => {
    dispatch({
      type: SENDING_MONEY,
      data: {
        isLoading: true
      }
    })
    setTimeout(() => {
      dispatch({
        type:SENDING_MONEY,
        data: {
          success: true,
          isLoading: false,
          amount: 10,
          from: 'hoangtrieukhang@gmail.com',
          to: 'foo@bar.com',
          type: 'SEND',
          currency: 'usd',
          error: null
        },
      })
      return;
    }, 1000);

    // fetch.post('http://localhost:3000/send_money')
    // .send({
    //   amount: 10,
    //   from: 'hoangtrieukhang@gmail.com',
    //   to: 'foo@bar.com',
    //   type: 'SEND',
    //   currency: 'usd'
    // })
    // .end((err, res) => {
    //   if(err) {
    //     dispatch({
    //       type:SENDING_MONEY,
    //       isLoading: false,
    //       data: null,
    //       error: err
    //     })
    //     return;
    //   } else {
    //     dispatch({
    //       type:SENDING_MONEY,
    //       isLoading: false,
    //       data: JSON.parse(res),
    //       error: null
    //     });
    //   }
    // });
  }
}

export {sendMoney};
