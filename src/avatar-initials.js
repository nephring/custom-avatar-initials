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
    return [
      'initials',
      'string',
      'size',
      'rounded',
      'corner-radius',
      'uppercase'
    ]
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
    // initials has priority
    if (!this._hasInitials() && this._hasString()) {
      return shortenInitials(getInitialsFromString(this.string))
    }
    return shortenInitials(this.initials)
  }

  _getBorderRadius() {
    // rounded has priority
    if (this.rounded) {
      return '50%'
    }
    return `${this.cornerRadius}px`
  }

  _render() {
    const borderRadius = this._getBorderRadius()
    const text = this._getText()

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
    this.shadowContainerElement.style.borderRadius = `${borderRadius}`
    if (this.uppercase)
      this.shadowContainerElement.style.textTransform = 'uppercase'

    this.shadowTextElement.style.fontSize = '1.7em'
    this.shadowTextElement.style.color = '#1a1a1a'
    this.shadowTextElement.style.fontFamily = 'sans-serif'
    this.shadowTextElement.style.fontWeight = 'bold'

    this.shadowTextElement.innerText = text

    this.shadowContainerElement.appendChild(this.shadowTextElement)
    this.shadow.appendChild(this.shadowContainerElement)
  }

  connectedCallback() {
    this.defaultAttributes = {
      initials: 'ab',
      string: 'john smith',
      size: 100,
      rounded: false,
      cornerRadius: 0,
      uppercase: false
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
      case 'size':
        return (this._size = newValue)
      case 'rounded':
        return (this._rounded = true)
      case 'corner-radius':
        return (this._cornerRadius = newValue)
      case 'uppercase':
        return (this._uppercase = true)
    }
  }

  get initials() {
    return this._initials || this.defaultAttributes.initials
  }

  get string() {
    return this._string || this.defaultAttributes.string
  }

  get rounded() {
    return this._rounded || this.defaultAttributes.rounded
  }

  get cornerRadius() {
    return this._cornerRadius || this.defaultAttributes.cornerRadius
  }

  get uppercase() {
    return this._uppercase || this.defaultAttributes.uppercase
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

  set cornerRadius(value) {
    this.setAttribute('corner-radius', value)
  }

  set uppercase(value) {
    this.setAttribute('uppercase', value)
  }
}

customElements.define('avatar-initials', AvatarInitials)
