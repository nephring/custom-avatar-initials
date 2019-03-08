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
  --auto-color,
  --background-color,
  --border,
  --border-color,

*/

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
      'border',
      'border-color',
      'auto-color'
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

  _getInitialsFromString = string => {
    return string
      .split(/ |-/)
      .map(value => value.charAt(0))
      .join('')
  }

  _getAvatarText() {
    const getText = () => {
      if (!this._hasInitials() && this._hasString()) {
        return this._getInitialsFromString(this.string)
      }
      return this.initials
    }
    const text = getText()
    return this._hasTextLength() ? text.substring(0, this.textLength) : text
  }

  _getRandomHexColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'

    Array(6)
      .fill()
      .map(() => (color += letters[Math.floor(Math.random() * letters.length)]))
    return color
  }

  _getBorderRadius() {
    if (this.rounded === 'true' || this.rounded === true) {
      return '50%'
    }
    return `${this.cornerRadius}px`
  }

  _isUppercase() {
    return this.uppercase === 'true' || this.uppercase === true
  }

  _isAutoColor() {
    return this.autoColor === 'true' || this.autoColor === true
  }

  _render() {
    this.shadowContainerElement = document.createElement('div')
    this.shadowTextElement = document.createElement('div')

    this.shadowContainerElement.style.display = 'flex'
    this.shadowContainerElement.style.justifyContent = 'center'
    this.shadowContainerElement.style.alignItems = 'center'
    this.shadowContainerElement.style.boxSizing = 'border-box'
    if (this.border)
      this.shadowContainerElement.style.border = `${this.border}px solid ${
        this.borderColor
      }`
    this.shadowContainerElement.style.backgroundColor = this._isAutoColor()
      ? this._getRandomHexColor()
      : this.backgroundColor
    this.shadowContainerElement.style.width = `${this.size}px`
    this.shadowContainerElement.style.height = `${this.size}px`
    this.shadowContainerElement.style.borderRadius = `${this._getBorderRadius()}`

    this.shadowTextElement.style.fontFamily = 'sans-serif'
    this.shadowTextElement.style.fontWeight = this.textWeight
    this.shadowTextElement.style.transform = `scale(${this.textScale})`
    this.shadowTextElement.style.color = this.textColor
    if (this._isUppercase())
      this.shadowTextElement.style.textTransform = 'uppercase'
    this.shadowTextElement.style.fontSize = '22px'
    this.shadowTextElement.innerText = this._getAvatarText()

    this.shadowContainerElement.appendChild(this.shadowTextElement)
    this.shadow.appendChild(this.shadowContainerElement)
  }

  connectedCallback() {
    this.defaultAttributes = {
      initials: 'ab',
      string: 'john smith',
      size: 60,
      rounded: false,
      cornerRadius: 0,
      uppercase: false,
      textWeight: '700',
      textScale: '1',
      textColor: '#494949',
      textLength: null,
      backgroundColor: '#e2e2e2',
      border: 0,
      borderColor: '#494949',
      autoColor: false
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
        return (this._rounded = newValue || true)
      case 'corner-radius':
        return (this._cornerRadius = newValue)
      case 'uppercase':
        return (this._uppercase = newValue || true)
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
      case 'border':
        return (this._border = newValue)
      case 'border-color':
        return (this._borderColor = newValue)
      case 'auto-color':
        return (this._autoColor = newValue || true)
    }
  }

  get initials() {
    return this._initials || this.defaultAttributes.initials
  }

  get size() {
    return this._size || this.defaultAttributes.size
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

  get border() {
    return this._border || this.defaultAttributes.border
  }

  get borderColor() {
    return this._borderColor || this.defaultAttributes.borderColor
  }

  get autoColor() {
    return this._autoColor || this.defaultAttributes.autoColor
  }

  set initials(value) {
    this.setAttribute('initials', value)
  }

  set size(value) {
    this.setAttribute('size', value)
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

  set border(value) {
    this.setAttribute('border', value)
  }

  set borderColor(value) {
    this.setAttribute('border-color', value)
  }

  set autoColor(value) {
    this.setAttribute('auto-color', value)
  }
}

customElements.define('avatar-initials', AvatarInitials)
