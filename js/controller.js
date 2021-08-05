import * as model from './model.js'
import containerView from './views/containerView.js'

//helpers
let latitude
let longitude

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(controlCurrentLocationForecast)
  } else {
    containerView.renderError()
  }
}

function controlInputDegrees() {
  const degrees = document.getElementById('degrees-option')
  degrees.addEventListener('change', function () {
    containerView.render(model.state, this.value)
  })
}

function controlSubmittedCity() {
  const searchInput = document.querySelector('.search-form')
  let city
  searchInput.addEventListener('submit', (e) => {
    e.preventDefault()

    city = document.querySelector('.search').value
    controlForecast(city)
  })
}

async function controlCurrentLocationForecast(position) {
  latitude = position.coords.latitude
  longitude = position.coords.longitude
  console.log(latitude, longitude)

  //render spinner (while getting api data)
  containerView.renderSpinner()

  console.log(latitude, longitude)
  await model.loadCurrentLocationData(latitude, longitude)
  containerView.render(model.state)
}

async function controlForecast(city) {
  //render spinner (while getting api data)
  containerView.renderSpinner()

  await model.loadData(city)
  const degree = document.getElementById('degrees-option').value
  containerView.render(model.state, degree)
  console.log(model.state)
}

function init() {
  containerView.handleHandler(getCurrentLocation())
  controlSubmittedCity()
  controlInputDegrees()
  console.log(window.navigator.language)
}

init()
