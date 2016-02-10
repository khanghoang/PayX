import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className='navbar-brand' style={{'textAlign': 'center', 'width': '100%'}}>
              {this.props.tittle}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propsTypes = {
  title: React.PropTypes.string
}
