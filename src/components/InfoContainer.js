import React from 'react';
import './InfoContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLinkedin,
    faGithub
} from '@fortawesome/free-brands-svg-icons';
export default function InfoContainer({ name, profilePic, work, githubLink, linkedinLink }) {
    return (
        <div className="contributor font-1">
            <img src={profilePic} alt='profile pic' className="pic"></img>
            <span>{name}</span>
            <h2>{work}
            </h2>
            <h3>connect with</h3>
            <div className="social-links">

                <FontAwesomeIcon className='social-icon' icon={faGithub} style={{ color: 'hsl(3, 100%, 95%)' }} onClick={() => { window.open(githubLink); }} />
                <FontAwesomeIcon className='social-icon' icon={faLinkedin} style={{ color: '#105DB8' }} onClick={() => { window.open(linkedinLink); }} />

            </div>
        </div>
    )
}
