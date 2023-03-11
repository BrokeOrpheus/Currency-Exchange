import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return(
    <>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/compare'>Compare</Link></li>
        </ul>
      </nav>

      <Outlet />

      <footer>Footer</footer>
    </>
  )
}

export default Layout;