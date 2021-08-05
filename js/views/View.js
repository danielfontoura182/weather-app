export default class View {
  _data

  render(data, degree) {
    if (!data) this.renderError()

    this._data = data

    const markup = this._generateMarkup(degree)

    this._clear()
    this._parentElement.insertAdjacentHTML('beforeend', markup)
  }

  _clear() {
    this._parentElement.innerHTML = ''
  }

  renderError() {
    const markup = `
      <p class="error">Sorry, something went wrong. Please, try again.</p>
      `

    this._clear()
    this._parentElement.insertAdjacentHTML('beforeend', markup)
  }

  renderSpinner() {
    const markup = `
    <div class="loader"></div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}
