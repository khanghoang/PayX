import React, {Component} from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

const HomePage = ({push, children}) => {

  const onClickSendMoney = () => {
    console.log('click send money');
    push('/sendMoney');
  }

  const onClickViewTransactions = () => {
    console.log('click view transactions');
    push('/viewTransactions');
  }

  return (
    <div className="HomePage">
      HomePage2
      <input
        className='form-control'
        type="button"
        onClick={onClickSendMoney}
        value='Send money'
      />
      <input
        className='form-control'
        type="button"
        onClick={onClickViewTransactions}
        value='View transactions history'
      />
    </div>
  )
}

export default connect(
  null,
  routeActions
)(HomePage)
