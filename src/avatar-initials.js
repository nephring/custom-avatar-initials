/*
  @properties

  initials,
  string,
  size,
  rounded,
  corner-radius,
  uppercase,
  text-weight,
  text-size,
  text-color,
  text-length,
  auto-color,
  background-color,
  border-color,
  border-thickness

*/

function shortenInitials(initials) {
  return initials.substring(0, 3)
}

function getInitialsFromString(string) {
  return string
    .split(/ |-/)
    .map(value => value.charAt(0))
    .join('')
}

class AvatarInitials extends HTMLElement {
  static get observedAttributes() {
    return ['initials', 'string', 'size', 'rounded']
  }

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  _hasInitials() {
    return this.hasAttribute('initials')
  }

  _hasString() {
    return this.hasAttribute('string')
  }

  _getText() {
    if (!this._hasInitials() && this._hasString()) {
      return shortenInitials(getInitialsFromString(this.string))
    }
    return shortenInitials(this.initials)
  }

  _render() {
    this.shadowContainerElement = document.createElement('div')
    this.shadowTextElement = document.createElement('div')

    this.shadowContainerElement.style.display = 'flex'
    this.shadowContainerElement.style.justifyContent = 'center'
    this.shadowContainerElement.style.alignItems = 'center'
    this.shadowContainerElement.style.boxSizing = 'border-box'
    this.shadowContainerElement.style.border = `1px solid black`
    this.shadowContainerElement.style.backgroundColor = `#eee`
    this.shadowContainerElement.style.width = `100px`
    this.shadowContainerElement.style.height = `100px`
    if (this.rounded) this.shadowContainerElement.style.borderRadius = '50%'

    this.shadowTextElement.style.fontSize = '1.7em'
    this.shadowTextElement.style.color = '#1a1a1a'
    this.shadowTextElement.style.fontFamily = 'sans-serif'
    this.shadowTextElement.style.fontWeight = 'bold'

    this.shadowTextElement.innerText = this._getText()

    this.shadowContainerElement.appendChild(this.shadowTextElement)
    this.shadow.appendChild(this.shadowContainerElement)
  }

  connectedCallback() {
    this.defaultAttributes = {
      initials: 'AB',
      string: 'John Smith',
      size: 100,
      rounded: false
    }
    this._render()
  }

  disconnectedCallback() {
    this.shadow.removeChild(this.shadowContainerElement)
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case 'initials':
        return (this._initials = newValue)
      case 'string':
        return (this._string = newValue)
    }
  }

  get initials() {
    return this._initials || this.defaultAttributes.initials
  }

  get string() {
    return this._string || this.defaultAttributes.string
  }

  get rounded() {
    return this.hasAttribute('rounded') || this.defaultAttributes.rounded
  }

  set initials(value) {
    this.setAttribute('initials', value)
  }

  set string(value) {
    this.setAttribute('string', value)
  }

  set rounded(value) {
    this.setAttribute('rounded', value)
  }
}

customElements.define('avatar-initials', AvatarInitials)
