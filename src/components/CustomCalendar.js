import React, { useState } from 'react'
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';


export default function Calendar(props) {
    const [value, onChange] = useState(new Date());
    
    return (
        <div className="calendar-container">
            <ReactCalendar
                onChange={onChange}
                value={value}
            />
        </div>
    )
}
