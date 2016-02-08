import fetch from 'superagent';

export const SEND_MONEY = 'SEND_MONEY';
export const SENDING_MONEY = 'SENDING_MONEY';
export const SEND_MONEY_FAILED = 'SEND_MONEY_FAILED';
export const SEND_MONEY_SUCCESSED = 'SEND_MONEY_SUCCESSED';

export const CLEAR_SEND_MONEY = 'CLEAR_SEND_MONEY';

const sendMoney = (data) => {
  return dispatch => {
    dispatch({
      type: SENDING_MONEY,
      data: {
        isLoading: true
      }
    });

    setTimeout(() => {
      dispatch({
        type:SEND_MONEY_SUCCESSED,
        data: {
          ...data,
          ...{
            from: 'khanghoang@gmail.com',
            success: true,
            isLoading: false,
            error: null
          }
        },
      })
      return;
    }, 3000);

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

const clearSendMoney = (data) => {
  return dispatch => {
    dispatch({
      type: CLEAR_SEND_MONEY,
      data: null
    })
  }
}

export {sendMoney, clearSendMoney};
