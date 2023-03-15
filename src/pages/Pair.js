import React from 'react';
import { checkStatus, json } from '../utils';
import { Dropdown } from '../components/Table.js';
import { FaChevronRight } from 'react-icons/fa';
import './Pair.css';

class Pair extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      amount: 1,
      outputCurr: 'EUR',
      outputRate: 1,
      currencies: [],
      currNames: {}
    }

    this.changeBase = this.changeBase.bind(this);
    this.changeOutput = this.changeOutput.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.fetchRates();
    this.fetchNames();
  }

  fetchRates() {
    let { base, outputCurr, amount } = this.state;
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${base}&to=${outputCurr}`)
    .then(checkStatus)
    .then(json)
    .then(data => {
      this.setState({
        outputRate: data.rates[outputCurr]
      });
    })
  }

  fetchNames () {
    fetch('https://api.frankfurter.app/currencies')
    .then(checkStatus)
    .then(json)
    .then(data => {
      this.setState({
        currencies: Object.keys(data),
        currNames: data
      });
      console.log(data);
    })
    .catch(error => console.log(error));
  }


  changeBase (event) {
    this.setState({ base: event.target.getAttribute('name') });
  }

  changeOutput (event) {
    this.setState({ outputCurr: event.target.getAttribute('name') });
  }

  changeAmount (event) {
    this.setState({ amount: event.target.value });
  }

  submit (event) {
    event.preventDefault();
    this.fetchRates();
  }


  render () {

    let { base, amount, outputCurr, outputRate, currencies, currNames } = this.state;

    return (
      <div id='pairContainer' className='container text-center'>
        <div className='row'>
          <h2 className='col mb-4'>Direct Conversion</h2>
        </div>
        <div id='grayRow' className='row pt-4 pb-4 justify-content-center border'>
          <div className='col-5 col-md-4'>
            <div className='input-group justify-content-center mb-3'>
              <Dropdown currencies={currencies} onClick={this.changeBase} currNames={currNames} />
              <div className='input-group-text'>
                <span name={base}>{base}</span>
                <span className='d-none d-lg-flex ms-1'>({currNames[base]})</span>
              </div>
            </div>
            <input className='form-control' type='number' value={amount} onChange={this.changeAmount} />
          </div>
          
          <div className='col-2 col-md-1 my-auto'>
            <FaChevronRight id='chevron' className='text-white' />
          </div>
          
          <div className='col-5 col-md-4'>
            <div className='input-group justify-content-center mb-3'>
              <Dropdown currencies={currencies} onClick={this.changeOutput} currNames={currNames} />
              <div className='input-group-text'>
                <span name={outputCurr}>{outputCurr}</span>
                <span className='d-none d-lg-flex ms-1'>({currNames[outputCurr]})</span>
              </div>
              
            </div>
            <input id='outputRate' className='form-control' disabled value={outputRate}/>
          </div>
          
          <div className='row'>
            <div className='col'>
              <button className='btn btn-primary mt-3' onClick={this.submit}>Submit</button>
            </div>
          </div>
          
        </div>
      </div>
      
    )
  }
}

export default Pair;