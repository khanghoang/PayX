import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import XMock from '../components/XMock.component';

function App({ push, children }) {
  return (
    <div>
      <XMock />
      {children}
    </div>
  )
}

export default connect(
  null,
  routeActions
)(App);
