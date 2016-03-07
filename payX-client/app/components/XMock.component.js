import React, {Component} from 'react';
import fetchMock from 'fetch-mock';

class XMock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      datasource: []
    }

    this.toggle = this.toggle.bind(this);

    window.fetchMock = fetchMock;

    Object.observe(window.fetchMock, () => {
      this.setState({
        datasource: window.fetchMock.routes
      });
    });
  }

  componentDidMount() {
    fetchMock.mock({
      routes: {
        name: 'route',
        matcher: 'http://localhost:3000/abc.json',
        response: {
          body: {
            _id: '123ABC',
            _rev: '946B7D1C',
            username: 'pgte',
            email: 'pedro.teixeira@gmail.com'
          }, sendAsJson: true}
      }
    });

    this.setState({
      datasource: window.fetchMock.routes
    });
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
          {`name:${r.name}, body: ${JSON.stringify(r.response.body)}`}
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
