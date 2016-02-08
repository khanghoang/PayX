import TransactionItem from './TransactionItem';

export default class TransactionList extends Component {
  render() {
    const rows = this.props.datasource.map((item) => {
      return (
        <TransactionItem />
      )
    });
    return (
      <div>
        {rows}
      </div>
    );
  }
}
