import React, {Component} from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <Header
        tittle='What are we doing?'
      />
      <input
        className='col-xs-12 btn btn-primary btn-lg vertical-padding-s'
        type="button"
        onClick={onClickSendMoney}
        value='Send money'
      />
      <input
        className='col-xs-12 btn btn-primary btn-lg vertical-padding-s'
        type="button"
        onClick={onClickViewTransactions}
        value='View transactions history'
      />
      <Footer
        />
    </div>
  )
}

export default connect(
  null,
  routeActions
)(HomePage)
