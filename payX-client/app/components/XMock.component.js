import React, {Component} from 'react';
import fetchMock from 'fetch-mock';
import xmock from '../components/xmock/xmock';
import storage from '../components/xmock/storage';

class XMock extends Component {
  constructor(props) {
    super(props);

    window.fetchMock = fetchMock;
    let mock = xmock(storage);

    this.state = {
      expanded: true,
      datasource: mock.getRoutes()
    }

    this.toggle = this.toggle.bind(this);
    this.unsubcribe = mock.subscribe((routes) => {
      this.setState({
        datasource: routes
      });
    })

  }

  componentWillUnmount() {
    this.unsubcribe();
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    let style = {
      position: 'absolute',
      height: (this.state.expanded ? '100%' : "50px"),
      width: '100%',
      backgroundColor: '#ddd',
      left: 0,
      top: 0,
      zIndex: 100000,
      overflow: 'scroll'
    }

    let requests = this.state.datasource.map((r, idx) => {
      const className = idx % 2 ? '' : 'even';
      return (
        <li className={className}>
          {`name:${r.name}, body: ${JSON.stringify(r.responseBody)}`}
        </li>
      )
    });

    return (
      <div style={style}>
        <input
          className='col-xs-3 btn btn-primary btn-lg vertical-padding-s'
          type="button"
          onClick={this.toggle}
          value='Toggle'
        />
        <hr></hr>
        <ul>
          {requests}
        </ul>
      </div>
    )
  }
}

export default XMock;
