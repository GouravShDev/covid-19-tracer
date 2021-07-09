import React, { useState } from 'react'
import './CountryInput.css'
import ReactFlagsSelect from 'react-flags-select';

export default function CountryInput(props) {
    const [selected, setSelected] = useState('');
    return (
        <div className="country-input-container">
            <h2> Select a Country</h2>
            <ReactFlagsSelect
                className='menu-flags'
                placeholder="Country"
                searchable
                selected={selected}
                onSelect={code => {
                    //console.log(code);
                    setSelected(code);
                    props.api_obj.getData(code, );
                }}></ReactFlagsSelect>
        </div>
    )
}
