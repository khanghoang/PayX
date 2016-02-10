import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          {this.props.children}
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  children: React.PropTypes.node
}
