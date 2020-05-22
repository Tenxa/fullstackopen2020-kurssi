import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weatherInfo, setWeatherInfo] = useState([])

    const hook = () => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
            .then(response => {
                console.log('promise fulfilled in Weather')
                setWeatherInfo(response.data.current)
            })
    }
    useEffect(hook, [])

    return (
        <div>
            <h2>Weather in {country.capital}<br /></h2>

            <div>
                <b>Temperature: {weatherInfo.temperature}</b> Celsius
            </div>

            <div>
                <img src={weatherInfo.weather_icons} alt={weatherInfo.weather_descriptions} height='50px' width='50px' />
            </div>

            <div>
                <b>wind: </b> {weatherInfo.wind_speed} mph direction {weatherInfo.wind_dir}
            </div>
        </div>
    )
}

export default Weather