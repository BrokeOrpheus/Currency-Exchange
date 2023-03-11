import React from 'react';
import './Table.css'

const Table = props => {
  let { base, baseVal, currencies, rates, onChange, onSubmit, onClick } = props;
  return (
    <table className='table table-light table-striped border'>
      <thead className=''>
        <tr>
          <th>
            <form className='input-group justify-content-center' onSubmit={onSubmit}>
              <Dropdown currencies={currencies} onClick={onClick} />
              <span className='input-group-text'>{base}</span>
              <button className='btn btn-primary' type='submit'>Submit</button>
            </form>
          </th>
          <th>
            <form onSubmit={onSubmit}>
              <div className='input-group'>
                <input className='form-control' type='number' value={baseVal} onChange={onChange}/>
                <button className='btn btn-primary' type='submit'>Submit</button>
              </div>
            </form>
          </th>
        </tr>
      </thead>
      <tbody>
        {currencies.map(currency => {
          let rate = rates[currency];
          return <Rate currency={currency} rate={rate} />
        })}
      </tbody>
    </table>
  )
}

const Dropdown = (props) => {
  let { currencies, onClick } = props;
  return(
    <>
    <button
      className='btn btn-secondary dropdown-toggle'
      type='button'
      data-bs-toggle="dropdown">
    </button>
    <ul className='dropdown-menu'>
      {currencies.map(currency => {
        return <li name={currency} onClick={onClick} className='dropdown-item'>{currency}</li>
      })}
    </ul>
      
    </>
    
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

export { Dropdown };
export default Table;