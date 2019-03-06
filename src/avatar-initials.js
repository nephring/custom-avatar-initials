/*
  @properties

  initials,
  string,
  size,
  rounded,
  cornerRadius,
  uppercase,
  textWeight,
  textScale,
  textColor,
  textLength,
  autoColor,
  backgroundColor,
  borderColor: { color, thickness }

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
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    this.defaultAttributes = {
      initials: 'ABC',
      string: 'John Smith Adam'
    }
  }

  static get observedAttributes() {
    return ['initials', 'string']
  }

  hasInitials() {
    return this.hasAttribute('initials')
  }

  hasString() {
    return this.hasAttribute('string')
  }

  connectedCallback() {
    console.log(this)
    this.render()
  }

  getText() {
    if (!this.hasInitials() && this.hasString()) {
      return shortenInitials(getInitialsFromString(this.string))
    }
    return shortenInitials(this.initials)
  }

  render() {
    this.shadowContainerElement = document.createElement('div')
    this.shadowTextElement = document.createElement('div')

    this.shadowContainerElement.style.display = 'flex'
    this.shadowContainerElement.style.justifyContent = 'center'
    this.shadowContainerElement.style.alignItems = 'center'
    this.shadowContainerElement.style.boxSizing = 'border-box'
    this.shadowContainerElement.style.border = `1px solid black`
    this.shadowContainerElement.style.backgroundColor = `#eee`
    this.shadowContainerElement.style.width = `70px`
    this.shadowContainerElement.style.height = `70px`

    this.shadowTextElement.style.fontSize = '1.7em'
    this.shadowTextElement.style.color = '#1a1a1a'
    this.shadowTextElement.style.fontFamily = 'sans-serif'
    this.shadowTextElement.style.fontWeight = 'bold'

    this.shadowTextElement.innerText = this.getText()

    this.shadowContainerElement.appendChild(this.shadowTextElement)
    this.shadow.appendChild(this.shadowContainerElement)
  }

  get initials() {
    return this.getAttribute('initials') || this.defaultAttributes.initials
  }

  get string() {
    return this.getAttribute('string') || this.defaultAttributes.string
  }
}

customElements.define('avatar-initials', AvatarInitials)
