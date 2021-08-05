import { API_KEY } from './config.js'

async function getData(city) {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=69df825187c840dc9df132224212407&q=${city}&days=7`
    )
    const data = await res.json()

    console.log(data)
    return data
  } catch (err) {
    throw err
  }
}

async function getCurrentLocationData(lat, long) {
  try {
    const res = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&offset=0&location=${lat}${long}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': `${API_KEY}`,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    )

    const data = await res.json()

    console.log(data)
    return data
  } catch (err) {
    throw err
  }
}

export const state = {}

function setState(data) {
  state.city = data.location.name
  state.icon = data.current.condition.icon
  state.lastUpdate = data.current.last_updated.split(' ')[1]
  state.tempC = data.current.temp_c
  state.tempF = data.current.temp_f
  state.humidity = data.current.humidity
  state.windKph = data.current.wind_kph
  state.windMph = data.current.wind_mph
  state.today = {}
  state.tomorrow = {}
  state.twoDays = {}
  state.today.maxTempC = data.forecast.forecastday[0].day.maxtemp_c
  state.today.maxTempF = data.forecast.forecastday[0].day.maxtemp_f
  state.today.minTempC = data.forecast.forecastday[0].day.mintemp_c
  state.today.minTempF = data.forecast.forecastday[0].day.mintemp_f
  state.today.condition = data.forecast.forecastday[0].day.condition.text
  state.today.icon = data.forecast.forecastday[0].day.condition.icon
  state.tomorrow.date = new Date(
    data.forecast.forecastday[1].date
  ).toLocaleDateString()
  state.tomorrow.maxTempC = data.forecast.forecastday[1].day.maxtemp_c
  state.tomorrow.maxTempF = data.forecast.forecastday[1].day.maxtemp_f
  state.tomorrow.minTempC = data.forecast.forecastday[1].day.mintemp_c
  state.tomorrow.minTempF = data.forecast.forecastday[1].day.mintemp_f
  state.tomorrow.condition = data.forecast.forecastday[1].day.condition.text
  state.tomorrow.icon = data.forecast.forecastday[1].day.condition.icon
  state.twoDays.date = new Date(
    data.forecast.forecastday[2].date
  ).toLocaleDateString()
  state.twoDays.maxTempC = data.forecast.forecastday[2].day.maxtemp_c
  state.twoDays.maxTempF = data.forecast.forecastday[2].day.maxtemp_f
  state.twoDays.minTempC = data.forecast.forecastday[2].day.mintemp_c
  state.twoDays.minTempF = data.forecast.forecastday[2].day.mintemp_f
  state.twoDays.condition = data.forecast.forecastday[2].day.condition.text
  state.twoDays.icon = data.forecast.forecastday[2].day.condition.icon
}

export async function loadData(city) {
  try {
    const data = await getData(city)
    setState(data)
  } catch (err) {
    throw err
  }
}

export async function loadCurrentLocationData(lat, long) {
  try {
    const data = await getCurrentLocationData(lat, long)
    await loadData(data.data[0].region)
  } catch (err) {
    throw err
  }
}
