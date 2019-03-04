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
    console.log(this)
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const template = document.createElement('template')

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
        <div class="text">AB</div>
      </div>
  `

    this.shadow.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('avatar-initials', AvatarInitials)
