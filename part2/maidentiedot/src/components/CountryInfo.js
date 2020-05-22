import React from 'react'

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1>{country.name}<br /></h1>

            <div>
                <p>capital {country.capital} <br />
                    population {country.population}
                </p>
            </div>

            <h2>Languages</h2>

            <div>
                <ul>
                    {country.languages.map((language, i) =>
                        <li key={i}>{language.name}</li>
                    )}
                </ul>
            </div>

            <div>
                <img src={country.flag} alt={`The flag of ${country.name}`} height='100px' width='100px'></img>
            </div>
        </div>
    )
}

export default CountryInfo