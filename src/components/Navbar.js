import React from 'react'
import virus from '../assests/svg/virus.svg';
import './Navbar.css'
import { Link } from 'react-router-dom';
// import './mobile.css'

export default function Navbar() {
    return (
        <div className='nav'>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h1 className='nav-logo logo-font'>COVID19 Tracer</h1>
            </Link>
            <div className="bg-img">
                <img className='virus-logo' src={virus} alt="virus" />
            </div>
            <Link to="/about" style={{ textDecoration: 'none' }}>
                <h2 className='nav-link font-1' >ABOUT</h2>
            </Link>
        </div>
    )
}
