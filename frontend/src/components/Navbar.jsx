import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Batik Tjah Ayoe" />
      </Link>
      <nav className="navbar-links">
        <NavLink to="/">Beranda</NavLink>
        <NavLink to="/katalog">Katalog</NavLink>
        <NavLink to="/keranjang">Keranjang</NavLink>
      </nav>
    </header>
  )
}

export default Navbar