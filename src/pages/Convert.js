import React from 'react';
import { checkStatus, json } from '../utils';
import { Dropdown } from '../components/Table.js';
import { FaChevronRight } from 'react-icons/fa';
import './Convert.css';
import { Chart } from 'chart.js/auto';

class Convert extends React.Component {
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
    this.fetchHistory = this.fetchHistory.bind(this);
    this.buildChart = this.buildChart.bind(this);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.fetchRates();
    this.fetchNames();
    this.fetchHistory();
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

  fetchHistory () {
    let { base, outputCurr } = this.state;
    let startDate = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    fetch(`https://api.frankfurter.app/${startDate}..?from=${base}&to=${outputCurr}`)
    .then(checkStatus)
    .then(json)
    .then(data => {
      if(data.error) {
        throw new Error(data.error);
      }

      let dates = Object.keys(data.rates);
      let rates = Object.values(data.rates).map(rate => rate[outputCurr]);
      let head = `${base}/${outputCurr}`;

      this.buildChart(dates, rates, head);
    })
    .catch(error => console.log(error));
  }

  buildChart (dates, rates, head) {
    let chartRef = this.chartRef.current.getContext('2d');

    if (typeof this.chart !== 'undefined') {
      this.chart.destroy();
    }

    this.chart = new Chart(chartRef, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: head,
            data: rates,
            fill: false,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true
      }
    })
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
    this.fetchHistory();
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
        <div id='canvasContainer' className='row justify-content-center mt-5'>
          <div className='col-12 col-md-10'>
            <canvas ref={this.chartRef} />
          </div>
        </div>
      </div>
      
    )
  }
}

export default Convert;