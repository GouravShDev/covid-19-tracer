import React from 'react'
import virus from '../assests/svg/virus.svg';
import './Navbar.css'

export default function Navbar() {
    return (
        <div className='nav'>
            <h1 className='nav-logo logo-font'>COVID19 Tracer</h1>
            <div className="bg-img">
                <img className='virus-logo' src={virus} alt="virus" />
            </div>
            <a href='/#' className='nav-link font-1' >ABOUT</a>
        </div>
    )
}
