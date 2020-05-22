import React from 'react'

const CountriesToShow = ({ countriesToMap, size }) => {
    if (size < 10 && size > 1) {
        return (
            <div>
                {countriesToMap.map((country, i) =>
                    <div key={i}>
                        {country.name}
                    </div>
                )}
            </div>
        )
    } else if (size === 1) {
        return (
            <div>
                <h1>{countriesToMap[0].name}<br /></h1>

                <div>
                    <p>capital {countriesToMap[0].capital} <br />
                    population {countriesToMap[0].population}
                    </p>
                </div>

                <h2>Languages</h2>

                <div>
                    <ul>
                        {countriesToMap[0].languages.map((language, i) => 
                            <li key={i}>{language.name}</li>
                        )}
                    </ul>
                </div>

                <div>
                    <img src={countriesToMap[0].flag} alt={`The flag of ${countriesToMap[0].name}`} height='100px' width='100px'></img>
                </div>
            </div>
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