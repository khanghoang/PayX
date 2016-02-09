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

    fetch.post('http://localhost:3000/send_money')
    .set('Accept', 'application/json')
    .type('form')
    .send({
      ...data,
      ...data.currency,
      ...{
        from: 'hoangtrieukhang@gmail.com',
      }
    })
    .end((err, res) => {
      if(!err) {
        dispatch({
          type: SEND_MONEY_SUCCESSED,
          isLoading: false,
          data: JSON.parse(res.text),
          error: null
        })
        return;
      } else {
        dispatch({
          type:SEND_MONEY_FAILED,
          isLoading: false,
          error: err
        });
      }
    });

    // setTimeout(() => {
    //   dispatch({
    //     type:SEND_MONEY_SUCCESSED,
    //     data: {
    //       ...data,
    //       ...{
    //         from: 'khanghoang@gmail.com',
    //         success: true,
    //         isLoading: false,
    //         error: null
    //       }
    //     },
    //   })
    //   return;
    // }, 3000);

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
