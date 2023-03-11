import React from 'react';
import { checkStatus, json } from '../utils'
import Table from '../components/Table.js'
import Compare from '../components/Compare'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      baseVal: 1,
      currencies: [],
      rates: {},
      error: '',
    }

    this.changeAmount = this.changeAmount.bind(this);
    this.submit = this.submit.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);

  }

  componentDidMount () {
    this.fetchRates();
  }

  fetchRates () {
    let { base, baseVal } = this.state;
    fetch(`https://api.frankfurter.app/latest?amount=${baseVal}&from=${base}`)
    .then(checkStatus)
    .then(json)
    .then(data => {
      this.setState({ currencies: Object.keys(data.rates) });
      this.setState({ rates: data.rates });
    })
    .catch(error => console.log(error));
  }

  changeAmount (event) {
    this.setState({ baseVal: event.target.value });
  }

  submit (event) {
    event.preventDefault();
    this.fetchRates();
  }

  changeCurrency (event) {
    this.setState({ base: event.target.getAttribute('name') });
  }

  render () {

    let { base, baseVal, currencies, rates } = this.state;

    return(
      <div className='container'>
        <div className='row text-center'>
          <div className='col'>
            <h2>Currency Exchange</h2>
            <Table
            base={base}
            baseVal={baseVal}
            currencies={currencies}
            rates={rates}
            onChange={this.changeAmount}
            onSubmit={this.submit}
            onClick={this.changeCurrency}
            />
          </div>
          <div className='col'>
            <h2>Compare</h2>
            <Compare />
          </div>
        </div>
      </div>
    )
  }
}



export default Home;