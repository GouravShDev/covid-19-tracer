import React from 'react'
import virus from '../assests/svg/virus.svg';
import Tracer from './Tracer';

export default function Home() {
    return (
        <div className="Home">

            <Tracer />
            {/* <CountryInput />
      <Calendar /> */}
            <img className='virus-img-1 virus-logo' style={{ filter: 'var(--filter-yellow)' }} src={virus} alt="virus" />
            {/* <CustomAnimatedNumber caseType='Cases' number={103243200} textColor='white' />
      <CustomAnimatedNumber caseType='Death' number={10326500} textColor='rgb(255, 39, 39)' />
      <CustomAnimatedNumber caseType='Recovered' number={12034500} textColor='rgb(15, 214, 108)' /> */}
            <img className='virus-img-2 virus-logo' style={{ filter: 'var(--filter-blue)' }} src={virus} alt="virus" />
        </div>
    )
}
