import React from 'react'
import CountryInfo from './CountryInfo'
import Button from './Button'


const CountriesToShow = ({ countriesToMap, size }) => {

    if (size < 10 && size > 1) {
        return (
            <div>
                {countriesToMap.map((country, i) =>
                    <div key={i}>
                        {country.name} <Button country={country} /> <br/>
                        
                    </div>
                )}
            </div>
        )
    } else if (size === 1) {
        return (
            <CountryInfo country={countriesToMap[0]} />
        )
    }
    else {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

}

export default CountriesToShow