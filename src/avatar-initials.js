/*
  @properties

  --initials,
  --string,
  --size,
  --rounded,
  --corner-radius,
  --uppercase,
  --text-weight,
  --text-scale
  --text-color,
  --text-length,
  auto-color,
  --background-color,
  --border-color,
  border-thickness

*/

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
      'uppercase',
      'text-weight',
      'text-scale',
      'text-color',
      'text-length',
      'background-color',
      'border-color'
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

  _hasTextLength() {
    return this.hasAttribute('text-length') && this.textLength
  }

  _getAvatarText() {
    // initials has priority
    const getText = () => {
      if (!this._hasInitials() && this._hasString()) {
        return getInitialsFromString(this.string)
      }
      return this.initials
    }
    const text = getText()
    return this._hasTextLength() ? text.substring(0, this.textLength) : text
  }

  _getBorderRadius() {
    // rounded has priority
    if (this.rounded) {
      return '50%'
    }
    return `${this.cornerRadius}px`
  }

  _render() {
    this.shadowContainerElement = document.createElement('div')
    this.shadowTextElement = document.createElement('div')

    this.shadowContainerElement.style.display = 'flex'
    this.shadowContainerElement.style.justifyContent = 'center'
    this.shadowContainerElement.style.alignItems = 'center'
    this.shadowContainerElement.style.boxSizing = 'border-box'
    this.shadowContainerElement.style.border = `1px solid ${this.borderColor}`
    this.shadowContainerElement.style.backgroundColor = this.backgroundColor
    this.shadowContainerElement.style.width = `100px`
    this.shadowContainerElement.style.height = `100px`
    this.shadowContainerElement.style.borderRadius = `${this._getBorderRadius()}`
    if (this.uppercase)
      this.shadowContainerElement.style.textTransform = 'uppercase'

    this.shadowTextElement.style.color = '#1a1a1a'
    this.shadowTextElement.style.fontFamily = 'sans-serif'
    this.shadowTextElement.style.fontWeight = this.textWeight
    this.shadowTextElement.style.transform = `scale(${this.textScale})`
    this.shadowTextElement.style.color = this.textColor

    this.shadowTextElement.innerText = this._getAvatarText()

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
      uppercase: false,
      textWeight: '700',
      textScale: '2',
      textColor: '#FFF',
      textLength: null,
      backgroundColor: '#959595',
      borderColor: '#555555'
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
      case 'text-weight':
        return (this._textWeight = newValue)
      case 'text-scale':
        return (this._textScale = newValue)
      case 'text-color':
        return (this._textColor = newValue)
      case 'text-length':
        return (this._textLength = newValue)
      case 'background-color':
        return (this._backgroundColor = newValue)
      case 'border-color':
        return (this._borderColor = newValue)
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

  get textWeight() {
    return this._textWeight || this.defaultAttributes.textWeight
  }

  get textScale() {
    return this._textScale || this.defaultAttributes.textScale
  }

  get textColor() {
    return this._textColor || this.defaultAttributes.textColor
  }

  get textLength() {
    return this._textLength || this.defaultAttributes.textLength
  }

  get backgroundColor() {
    return this._backgroundColor || this.defaultAttributes.backgroundColor
  }

  get borderColor() {
    return this._borderColor || this.defaultAttributes.borderColor
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

  set textWeight(value) {
    this.setAttribute('text-weight', value)
  }

  set textScale(value) {
    this.setAttribute('text-scale', value)
  }

  set textColor(value) {
    this.setAttribute('text-color', value)
  }

  set textLength(value) {
    this.setAttribute('text-length', value)
  }

  set backgroundColor(value) {
    this.setAttribute('background-color', value)
  }

  set borderColor(value) {
    this.setAttribute('border-color', value)
  }
}

customElements.define('avatar-initials', AvatarInitials)
