import React from 'react'
import './About.css'
import virus from '../assests/svg/virus.svg';
import InfoContainer from './InfoContainer';
import './mobile.css'


export default function About() {
    return (
        <div className="About">
            <div className="contributors">
                <InfoContainer name='Gourav Sharma' profilePic='https://avatars.githubusercontent.com/u/74348508?v=4' work='{ FRONT-END }' linkedinLink='https://www.linkedin.com/in/gourav-sharma-0833b3214/' githubLink='https://github.com/GouravShDev' />
                <InfoContainer name='Shivanshu Mishra' profilePic='https://avatars.githubusercontent.com/u/34084862?v=4' work='< BACK-END >' linkedinLink='https://www.linkedin.com/in/shivanshu-mishra-a06082210/' githubLink='https://github.com/Shivanshu10' />
            </div>
            <img className='virus-img-1 virus-logo' style={{ filter: 'var(--filter-yellow)' }} src={virus} alt="virus" />
            <img className='virus-img-2 virus-logo' style={{ filter: 'var(--filter-blue)' }} src={virus} alt="virus" />
            <div className="about-content">
                <h1 className='logo-font'>COVID19 Tracer</h1>
                <p>Covid19 Tracer is a react based site which provides live data on COVID-19 cases with the help of Global Coronavirus API. This site shows data of all countries covid-19 cases including recovered and death cases.</p>
            </div>
        </div>
    )
}
