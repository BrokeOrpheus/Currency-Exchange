import React from 'react';
import Table from '../components/Table.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render () {

    return(
      <div className='container'>
        <div className='row text-center'>
          <div className='col'>
            <h2 className='mb-3'>Full Exchange Table</h2>
            <Table />
          </div>
        </div>
      </div>
    )
  }
}



export default Home;