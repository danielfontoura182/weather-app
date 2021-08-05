import View from './View.js'

class ContainerView extends View {
  _parentElement = document.querySelector('.container')

  _generateMarkup(degree) {
    return `
      <div class="weather-container">
        <div class="weather-container__city">${this._data.city}</div>
        <div class="weather-container__last-update">Last update: ${
          this._data.lastUpdate
        }</div>
        <img    
          src="${this._data.icon}"
          alt="weather icon"
          class="weather-container__icon"
        />
        <div class="weather-container__bottom">
          <div class="weather-container__temperature">${
            degree === 'c' ? this._data.tempC : this._data.tempF
          }°</div>
          <div class="weather-container__humidity-wind">
            <div class="weather-container__humidity">Humidity: ${
              this._data.humidity
            }%</div>
            <div class="weather-container__wind">
              Wind: ${this._data.windKph}km/h <span class="wind-mph">(${
      this._data.windMph
    }mph)</span>
            </div>
          </div>
        </div>
        <div class="weather-container__info-days">
          <div class="weather-container__today">
            <ul class="weather-container__info-list">
              <li>Today</li>
              <li>Max: ${
                degree === 'c'
                  ? this._data.today.maxTempC
                  : this._data.today.maxTempF
              }°</li>
              <li>Min: ${
                degree === 'c'
                  ? this._data.today.minTempC
                  : this._data.today.minTempF
              }°</li>
              <li>
                ${this._data.today.condition}
                <img
                  src="${this._data.today.icon}"
                  alt="weather icon"
                  class="weather-container__small-icon"
                />
              </li>
            </ul>
          </div>
          <div class="weather-container__tomorrow">
            <ul class="weather-container__info-list">
              <li>${this._data.tomorrow.date}</li>
              <li>Max: ${
                degree === 'c'
                  ? this._data.tomorrow.maxTempC
                  : this._data.tomorrow.maxTempF
              }°</li>
              <li>Min: ${
                degree === 'c'
                  ? this._data.tomorrow.minTempC
                  : this._data.tomorrow.minTempF
              }°</li>
              <li>
                ${this._data.tomorrow.condition}
                <img
                  src="${this._data.tomorrow.icon}"
                  alt="weather icon"
                  class="weather-container__small-icon"
                />
              </li>
            </ul>
          </div>
          <div class="weather-container__two-days">
            <ul class="weather-container__info-list">
            <li>${this._data.twoDays.date}</li>
            <li>Max: ${
              degree === 'c'
                ? this._data.twoDays.maxTempC
                : this._data.twoDays.maxTempF
            }°</li>
            <li>Min: ${
              degree === 'c'
                ? this._data.twoDays.minTempC
                : this._data.twoDays.minTempF
            }°</li>
            <li>
              ${this._data.twoDays.condition}
              <img
                src="${this._data.twoDays.icon}"
                alt="weather icon"
                class="weather-container__small-icon"
              />
            </li>
            </ul>
          </div>
        </div>
      </div>
    `
  }

  handleHandler(handler) {
    window.addEventListener('load', handler)
  }
}

export default new ContainerView()
