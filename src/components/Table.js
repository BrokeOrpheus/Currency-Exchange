import React from 'react';
import './Table.css';
import { checkStatus, json } from '../utils';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      baseVal: 1,
      currencies: [],
      rates: {},
      currNames: {},
      error: '',
    }

    this.changeAmount = this.changeAmount.bind(this);
    this.submit = this.submit.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);

  }

  componentDidMount () {
    this.fetchRates();
    this.fetchNames();
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

  fetchNames () {
    fetch('https://api.frankfurter.app/currencies')
    .then(checkStatus)
    .then(json)
    .then(data => this.setState({ currNames: data }))
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

  render() {

    let { base, baseVal, currencies, rates, currNames } = this.state;

    return (
      <table className='table text-start border'>
        <thead>
          <tr className='d-none d-md-table-row'>
            <th>
              <form className='input-group justify-content-center' onSubmit={this.submit}>
                <Dropdown currencies={currencies} onClick={this.changeCurrency} currNames={currNames} />
                <div className='input-group-text'>
                  <span className='me-1'>{base}</span>
                  <span className='d-none d-lg-flex'>({currNames[base]})</span>
                </div>
                <button className='btn btn-primary' type='submit'>Submit</button>
              </form>
            </th>
            <th>
              <form onSubmit={this.submit}>
                <div className='input-group'>
                  <input className='form-control' type='number' value={baseVal} onChange={this.changeAmount} />
                  <button className='btn btn-primary' type='submit'>Submit</button>
                </div>
              </form>
            </th>
          </tr>
          <tr className='d-table-row d-md-none'>
            <th colSpan='2'>
              <form className='input-group justify-content-center' onSubmit={this.submit}>
                <Dropdown currencies={currencies} onClick={this.changeCurrency} currNames={currNames} />
                <span className='input-group-text'>{base}</span>
                <input className='form-control' type='number' value={baseVal} onChange={this.changeAmount} />
                <button className='btn btn-primary' type='submit'>Submit</button>
              </form>
            </th>
          </tr>
        </thead>
        <tbody>
          {currencies.map(currency => {
            let rate = rates[currency];
            let currName = currNames[currency];
            return <Rate currency={currency} rate={rate} currName={currName} />
          })}
        </tbody>
      </table>
    )
  }
  
}

const Dropdown = (props) => {
  let { currencies, onClick, currNames } = props;
  return(
    <>
    <button
      className='btn btn-secondary dropdown-toggle'
      type='button'
      data-bs-toggle="dropdown">
    </button>
    <ul className='dropdown-menu mb-5'>
      {currencies.map(currency => {
        let currName = currNames[currency];
        return <a name={currency} onClick={onClick} className='dropdown-item'>{currency} ({currName})</a>
      })}
    </ul>
    </>
    
  );
}

//For Table Rates
const Rate = (props) => {
  let { currency, rate, currName } = props;
  return(
    <tr>
      <td>{currency} <span className='textColor'>({currName})</span></td>
      <td>{rate}</td>
    </tr>
  )
}

export { Dropdown };
export default Table;