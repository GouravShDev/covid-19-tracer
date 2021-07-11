import React, { useState, useEffect } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import './CountryInput.css'
import CustomAnimatedNumber from './CustomAnimatedNumber';
import API, {dateToString, countryCodeToString, graphFormat} from '../api/api'
import CustomGraph from './CustomGraph';

export default function Tracer() {
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [cases, setCases]=useState({confirmed: 0, deaths: 0, recovered: 0});
    const [casesData, setcasesData] = useState({confirmed: null, deaths: null, recovered: null});
    useEffect(() => {
        var api=new API();
        var temp={confirmed: null, deaths: null, recovered: null};
        Object.keys(casesData).forEach((key) => {
            api.getData(key, (covidPoints) => { temp[key]=covidPoints; });
        });
        setcasesData(temp);
    }, []);
    //console.log(casesData);
    const d = graphFormat(casesData, country, date.getMonth(), date.getFullYear().toString());
    //console.log(d);
    function processData() {
        console.log(`${country} ${date}`);
        var date_string=dateToString(date);
        var dates;
        var country_region;
        var country_string=countryCodeToString(country);
        Object.keys(casesData).forEach((key) => {
            for (country_region in casesData[key]) {
                if (country_region===country_string) {
                    for (dates in casesData[key][country_string]) {
                        //console.log(dates);
                        //console.log(date_string);
                        if (dates===date_string) {
                            setCases((prevCases) => {
                                return { ...prevCases, [key]: casesData[key][country_string][date_string]};
                            });
                            //console.log(cases);
                        }
                    }
                }
            }
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
            <CustomGraph points={d} />
        </div>
    )
}
