import { Link, Outlet } from 'react-router-dom';
import { FiGithub, } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';
import './Layout.css';

const Layout = () => {
  return(
    <div className='container-fluid '>
      <nav className='row fixed-top'>
        <div className='col'>
          <Link to='/' className='fs-4 highlight ms-3'>All Rates</Link>
        </div>
        <div className='col'>
          <p className='fs-3 m-0 text-center'>X-Change</p>
        </div>
        <div className='col text-end'>
          <Link to='/convert' className='fs-4 highlight me-3'>Convert</Link>
        </div>
      </nav>

      <div className='filler'></div>

      <Outlet />

      <div className='filler'></div>

      <footer id='footer' className='row fs-4 fixed-bottom text-center'>

        <div>
          <a className='highlight' href='https://delicate-lokum-e32c09.netlify.app'>Portfolio</a>
          <span className='mx-2'>|</span>
          <a className='highlight' href='https://github.com/BrokeOrpheus'>
            <FiGithub />
          </a>
          <span className='mx-2'>|</span>
          <a className='highlight' href='https://www.linkedin.com/in/kyle-register-096143210/'>
            <FaLinkedinIn />
          </a>
        </div>
        
      </footer>
    </div>
  )
}

export default Layout;