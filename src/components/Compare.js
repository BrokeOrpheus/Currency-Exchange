import React from 'react';
import { checkStatus, json } from '../utils';
import { Dropdown } from './Table';

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftCurr: 'USD',
      rightCurr: 'EUR',
      currencies: []
    }

    this.changeLeft = this.changeLeft.bind(this);
    this.changeRight = this.changeRight.bind(this);
  }

  componentDidMount() {
    fetch('https://api.frankfurter.app/latest')
    .then(checkStatus)
    .then(json)
    .then(data => this.setState({ currencies: Object.keys(data.rates) }));
  }

  changeLeft (event) {
    this.setState({ leftCurr: event.target.getAttribute('name') });
  }

  changeRight (event) {
    this.setState({ rightCurr: event.target.getAttribute('name') });
  }

  render () {

    let { leftCurr, rightCurr, currencies } = this.state;

    return (
      <div className='row'>
        <div className='col input-group justify-content-center'>
          <Dropdown currencies={currencies} onClick={this.changeLeft} />
          <span name={leftCurr} className='input-group-text'>{leftCurr}</span>
        </div>
        <p className='col'>vs</p>
        <div className='col input-group justify-content-center'>
          <span name={rightCurr} className='input-group-text'>{rightCurr}</span>
          <Dropdown currencies={currencies} onClick={this.changeRight} />
        </div>
        <div className='row'>
          <div className='col'>
            <button className='btn btn-primary' type='submit'>Submit</button>
          </div>
        </div>
        
      </div>
    )
  }
}

export default Compare;