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
      string: 'John Smith Adam',
      rounded: false
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
    const template = document.createElement('template')

    const text = this.getText()

    template.innerHTML = `
      <style>
        .avatar {
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          width: 60px;
          height: 60px;
          border: 1px solid white;
          border-radius: 50%;
          background-color: #eee;
        }

        .text {
          font-size: 1.7em;
          color: #1a1a1a;
          font-family: sans-serif;
          font-weight: bold;
          padding: 2px;
        }
      </style>
      <div class="avatar">
        <div class="text">${text}</div>
      </div>
  `

    this.shadow.appendChild(template.content.cloneNode(true))
  }

  get initials() {
    return this.getAttribute('initials') || this.defaultAttributes.initials
  }

  get string() {
    return this.getAttribute('string') || this.defaultAttributes.string
  }
}

customElements.define('avatar-initials', AvatarInitials)
