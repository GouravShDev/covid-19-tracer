import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import './CountryInput.css'
import CustomAnimatedNumber from './CustomAnimatedNumber';
import API from '../api/api'

export default function Tracer() {
    const [country, setCountry] = useState();
    const [date, setDate] = useState(new Date());

    const [cases, setCases] = useState({ confirmed: 0, deaths: 0, recovered: 0 });

    function processData() {
        console.log(`${country} ${date}`);
        var api = new API();
        Object.keys(cases).forEach((key) => {
            api.getData(key, country, date, (covidCases) => {
                if (covidCases) {
                    setCases((prevCases) => {
                        return { ...prevCases, [key]: covidCases };
                    });
                }
            })
        });
    }
    return (
        <div>
            <div className="country-input-container">
                <h2> Select a Country</h2>
                <ReactFlagsSelect
                    className='menu-flags'
                    placeholder="Country"
                    searchable
                    selected={country}
                    onSelect={selectedCountry => {
                        // console.log(selectedCountry);

                        setCountry(selectedCountry);
                    }}></ReactFlagsSelect>
            </div>
            <div className="calendar-container">
                <ReactCalendar
                    value={date}
                    maxDate={new Date()}
                    minDate={new Date(2021, 0, 1)}
                    onChange={(newDate) => {
                        if (!country) {
                            alert('Select Country first');
                        } else {
                            setDate(newDate);
                            processData();
                        }
                    }}
                />
            </div>
            <CustomAnimatedNumber caseType='Cases' number={cases.confirmed} textColor='white' />
            <CustomAnimatedNumber caseType='Death' number={cases.deaths} textColor='rgb(255, 39, 39)' />
            <CustomAnimatedNumber caseType='Recovered' number={cases.recovered} textColor='rgb(15, 214, 108)' />

        </div>
    )
}
