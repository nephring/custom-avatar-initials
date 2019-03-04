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

class AvatarInitials extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    this.defaultAttributes = {
      initials: 'AB'
    }
  }

  static get observedAttributes() {
    return ['initials']
  }

  connectedCallback() {
    this.render()
  }

  setAttributes() {
    this.setAttribute('initials', this.initials)
  }

  shortenInitials() {
    return this.initials.substring(0, 3)
  }

  render() {
    const template = document.createElement('template')

    const initials = this.shortenInitials()

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
        <div class="text">${initials}</div>
      </div>
  `

    this.shadow.appendChild(template.content.cloneNode(true))
    this.setAttributes()
  }

  get initials() {
    return this.getAttribute('initials') || this.defaultAttributes.initials
  }
}

customElements.define('avatar-initials', AvatarInitials)
