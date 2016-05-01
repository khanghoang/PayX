export const FETCHING_SEND_MONEY_FORM = 'FETCHING_SEND_MONEY_FORM';
export const FETCH_SEND_MONEY_FORM_FAILED = 'FETCH_SEND_MONEY_FORM_FAILED';
export const FETCH_SEND_MONEY_FORM_SUCCESSED = 'FETCH_SEND_MONEY_FORM_SUCCESSED';

const fetchSendMoneyForm = () => {
  return dispatch => {
    dispatch({
      type: FETCHING_SEND_MONEY_FORM,
      data: {
        isLoading: true
      }
    });

    setTimeout(() => {
      dispatch({
        type:FETCH_SEND_MONEY_FORM_SUCCESSED,
        data: {
          success: true
        },
      })
    }, 2000);
  }
}
