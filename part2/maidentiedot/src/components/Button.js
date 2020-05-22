import React, { useState } from 'react'
import CountryInfo from './CountryInfo'

const Button = ({ country }) => {
    const [show, setShow] = useState(false)

    
    return (
        <div>
            <button type='button' onClick={() => setShow(!show)}>{!show ? <div>show</div> : <div>hide</div>}</button>
            {show ? <CountryInfo country={country}/> : null}
        </div>
    )
}

export default Button