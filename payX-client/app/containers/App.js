import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

function App({ push, children }) {
  return (
    <div>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  )
}

export default connect(
  null,
  routeActions
)(App);
