import React from 'react';
import { checkStatus, json } from '../utils'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: '',
      baseVal: 1,
      currencies: [],
      rates: {},
      error: '',
    }

  }

  componentDidMount() {
    this.fetchRates();
  }

  fetchRates() {
    fetch('https://api.frankfurter.app/latest?from=USD')
    .then(checkStatus)
    .then(json)
    .then(data => {
      this.setState({ base: data.base });
      this.setState({ currencies: Object.keys(data.rates) });
      this.setState({ rates: data.rates });
      console.log(this.state);
    })
    .catch(error => console.log(error));
  }

  render() {

    let { base, currencies, rates } = this.state;

    return(
      <div className='container'>
        <div className='row text-center'>
          <div className='col'>
            <h2>Currency Exchange</h2>
            
            <table className='table'>
              <tr>
                <th>
                  <div className='input-group'>
                    <button
                      id='toggleButton'
                      className='btn btn-secondary dropdown-toggle'
                      type='button'
                      data-bs-toggle="dropdown">
                    </button>
                    <ul className='dropdown-menu'>
                      {currencies.map(currency => {
                        return <CurrencyList currency={currency} />
                      })}
                    </ul>
                    <span className='input-group-text'>{base}</span>
                  </div>
                </th>
                <th><input type='number'/></th>
              </tr>
              {currencies.map(currency => {
                let rate = rates[currency];
                return <Rate currency={currency} rate={rate} />
              })}
            </table>
          </div>
          <div className='col'>
            <h2>Compare</h2>
          </div>
        </div>
      </div>
    )
  }
}

// For Dropdown List
const CurrencyList = (props) => {
  let { currency } = props;
  return(
    <li className='dropdown-item'>{currency}</li>
  );
}

//For Table Rates
const Rate = (props) => {
  let { currency, rate } = props;
  return(
    <tr>
      <td>{currency}</td>
      <td>{rate}</td>
    </tr>
  )
}

export default Home;