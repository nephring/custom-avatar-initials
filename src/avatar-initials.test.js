function test(title, callback) {
  const results = document.getElementById('results')
  const result = document.createElement('code')
  try {
    callback()
    console.log(
      `✔️ %cPASSED %c${title}`,
      'color: green',
      'color: grey; font-size: 14px;'
    )
    result.innerHTML = `✔️ <code style="color: green;">PASSED</code> ${title}`
    results.appendChild(result)
  } catch (error) {
    console.log(
      `❌ %cFAIL %c${title}`,
      'color: red',
      'color: grey; font-size: 14px;'
    )
    result.innerHTML = `❌ <code style="color: red;">FAIL</code> ${title}`
    results.appendChild(result)
    console.error(error)
  } finally {
  }
}

function expect(result) {
  return {
    toBe(expected) {
      if (result !== expected) {
        throw new Error(
          `The result of ${result} is not equal to expected: ${expected}`
        )
      }
    },
    notToBe(expected) {
      if (result === expected) {
        throw new Error(
          `The result of ${result} is equal to expected: ${expected}`
        )
      }
    }
  }
}

/*
 * Tests are encapsulated, so it can't affect the others.
 * Each test mount it's own custom element to the DOM.
 */

test('avatar element should be displayed in document body as custom element', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  const isCustomElement =
    customElements.get('avatar-initials') === avatar.constructor
  container.appendChild(avatar)

  expect(container.contains(avatar)).toBe(true)
  expect(avatar.constructor !== HTMLElement).toBe(true)
  expect(isCustomElement).toBe(true)
})

test('avatar shape should contains default styles, when avatar attributes are not given', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')
  const defaultContainerAttributes = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: 'rgb(226, 226, 226)',
    width: '60px',
    height: '60px',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px'
  }

  expect(avatar.attributes.length).toBe(0)
  expect(shapeElement.style.length).toBe(
    Object.keys(defaultContainerAttributes).length
  )
  expect(shapeElement.style.display).toBe(defaultContainerAttributes.display)
  expect(shapeElement.style.justifyContent).toBe(
    defaultContainerAttributes.justifyContent
  )
  expect(shapeElement.style.alignItems).toBe(
    defaultContainerAttributes.alignItems
  )
  expect(shapeElement.style.boxSizing).toBe(
    defaultContainerAttributes.boxSizing
  )
  expect(shapeElement.style.backgroundColor).toBe(
    defaultContainerAttributes.backgroundColor
  )
  expect(shapeElement.style.width).toBe(defaultContainerAttributes.width)
  expect(shapeElement.style.height).toBe(defaultContainerAttributes.height)
  expect(shapeElement.style.borderBottomLeftRadius).toBe(
    defaultContainerAttributes.borderBottomLeftRadius
  )
  expect(shapeElement.style.borderBottomRightRadius).toBe(
    defaultContainerAttributes.borderBottomRightRadius
  )
  expect(shapeElement.style.borderTopLeftRadius).toBe(
    defaultContainerAttributes.borderTopLeftRadius
  )
  expect(shapeElement.style.borderTopRightRadius).toBe(
    defaultContainerAttributes.borderTopRightRadius
  )
})

test('avatar text should contains default styles, when avatar attributes are not given', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  container.appendChild(avatar)

  const textElement = avatar.shadowRoot.getElementById('text')
  const defaultTextAttributes = {
    fontFamily: 'sans-serif',
    fontWeight: '700',
    transform: 'scale(1)',
    color: 'rgb(73, 73, 73)',
    fontSize: '22px'
  }

  expect(avatar.attributes.length).toBe(0)
  expect(textElement.style.fontFamily).toBe(defaultTextAttributes.fontFamily)
  expect(textElement.style.fontWeight).toBe(defaultTextAttributes.fontWeight)
  expect(textElement.style.transform).toBe(defaultTextAttributes.transform)
  expect(textElement.style.color).toBe(defaultTextAttributes.color)
  expect(textElement.style.fontSize).toBe(defaultTextAttributes.fontSize)
})

test('avatar text should display correct value, when initials attribute is set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('initials', 'BC')
  container.appendChild(avatar)
  const textElement = avatar.shadowRoot.getElementById('text')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes.initials.value).toBe('BC')
  expect(textElement.innerText).toBe('BC')
})

test('avatar text should display correct value, when string attribute is set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('string', 'John Kane')
  container.appendChild(avatar)
  const textElement = avatar.shadowRoot.getElementById('text')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes.string.value).toBe('John Kane')
  expect(textElement.innerText).toBe('JK')
})

test('avatar text should display correct value, when initials and string attributes are set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('string', 'Alice Montana')
  avatar.setAttribute('initials', 'RT')
  container.appendChild(avatar)

  const textElement = avatar.shadowRoot.getElementById('text')

  expect(avatar.attributes.length).toBe(2)
  expect(avatar.attributes.string.value).toBe('Alice Montana')
  expect(avatar.attributes.initials.value).toBe('RT')
  // initials has priority
  expect(textElement.innerText).toBe('RT')
})

test('avatar shape should be displayed in the correct size, when size attribute is set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('size', '120')
  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes.size.value).toBe('120')
  expect(shapeElement.style.width).toBe('120px')
  expect(shapeElement.style.height).toBe('120px')
})

test('avatar shape should be displayed as circle, when rounded attribute is set to "true"', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('rounded', true)
  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes.rounded.value).toBe('true')
  expect(shapeElement.style.borderRadius).toBe('50%')
})

test('avatar shape should be displayed as square, when rounded attribute is set to "false"', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('rounded', false)
  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes.rounded.value).toBe('false')
  expect(shapeElement.style.borderRadius).toBe('0px')
})

test('avatar shape should display rounded corners, when corner-radius attribute is set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('corner-radius', '15')
  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes['corner-radius'].value).toBe('15')
  expect(shapeElement.style.borderRadius).toBe('15px')
})

test('avatar text should be displayed uppercased, when uppercase attribute is set to "true"', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('uppercase', true)
  container.appendChild(avatar)

  const textElement = avatar.shadowRoot.getElementById('text')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes.uppercase.value).toBe('true')
  expect(textElement.innerText).toBe('ab'.toUpperCase())
})

test('avatar text should not be displayed uppercased, when uppercase attribute is set to "false"', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('uppercase', false)
  container.appendChild(avatar)

  const textElement = avatar.shadowRoot.getElementById('text')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes.uppercase.value).toBe('false')
  expect(textElement.innerText).toBe('ab')
})

test('avatar text should display correct text-weight, when text-weight attribute is set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('text-weight', '300')
  container.appendChild(avatar)

  const textElement = avatar.shadowRoot.getElementById('text')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes['text-weight'].value).toBe('300')
  expect(textElement.style.fontWeight).toBe('300')
})

test('avatar text should be displayed in correct scale, when text-scale attribute is set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('text-scale', 2)
  container.appendChild(avatar)

  const textElement = avatar.shadowRoot.getElementById('text')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes['text-scale'].value).toBe('2')
  expect(textElement.style.transform).toBe('scale(2)')
})

test('avatar text should be displayed in correct color, when text-color attribute is set ', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('text-color', 'red')
  container.appendChild(avatar)

  const textElement = avatar.shadowRoot.getElementById('text')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes['text-color'].value).toBe('red')
  expect(textElement.style.color).toBe('red')
})

test('avatar text should have proper length, when text-length and initials attribute are set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('initials', '1234')
  avatar.setAttribute('text-length', 2)
  container.appendChild(avatar)

  const textElement = avatar.shadowRoot.getElementById('text')

  expect(avatar.attributes.length).toBe(2)
  expect(avatar.attributes['text-length'].value).toBe('2')
  expect(textElement.innerText.length).toBe(2)
  expect(textElement.innerText).toBe('12')
})

test('avatar shape should be displayed in correct color, when background-color attribute is set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  avatar.setAttribute('background-color', 'lightgreen')
  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes['background-color'].value).toBe('lightgreen')
  expect(shapeElement.style.backgroundColor).toBe('lightgreen')
})

test('avatar shape should display border with default color, when border attribute is set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  const borderValue = '1'
  avatar.setAttribute('border', borderValue)
  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes.border.value).toBe(borderValue)
  expect(shapeElement.style.border).toBe(
    `${borderValue}px solid rgb(73, 73, 73)`
  )
})

test('avatar shape should display border with correct color, when border and border-color attributes are set', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  const borderValue = '2'
  const borderColor = 'peru'
  avatar.setAttribute('border', borderValue)
  avatar.setAttribute('border-color', borderColor)
  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')

  expect(avatar.attributes.length).toBe(2)
  expect(avatar.attributes.border.value).toBe(borderValue)
  expect(avatar.attributes['border-color'].value).toBe(borderColor)
  expect(shapeElement.style.border).toBe(
    `${borderValue}px solid ${borderColor}`
  )
})

test('avatar shape should be displayed in default color, when auto-color attribute is set to "false"', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  const defaultColor = 'rgb(226, 226, 226)'
  avatar.setAttribute('auto-color', false)
  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes['auto-color'].value).toBe('false')
  expect(shapeElement.style.backgroundColor).toBe(defaultColor)
})

test('avatar shape should not be displayed in default color, when auto-color attribute is set to "true"', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  const defaultColor = 'rgb(226, 226, 226)'
  avatar.setAttribute('auto-color', true)
  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')

  expect(avatar.attributes.length).toBe(1)
  expect(avatar.attributes['auto-color'].value).toBe('true')
  expect(shapeElement.style.backgroundColor).notToBe(defaultColor)
})

test('avatar element should display correct text and shape, when available attributes are set together', () => {
  const container = document.getElementById('avatars')
  const avatar = document.createElement('avatar-initials')
  const attributes = {
    initials: 'xyz',
    string: 'John Hendrix-Smith',
    size: 100,
    rounded: false,
    cornerRadius: 30,
    uppercase: true,
    textWeight: 400,
    textScale: 2,
    textColor: 'green',
    textLength: 2,
    backgroundColor: 'lightgreen',
    border: 2,
    borderColor: 'green',
    autoColor: false
  }
  avatar.setAttribute('initials', attributes.initials)
  avatar.setAttribute('string', attributes.string)
  avatar.setAttribute('size', attributes.size)
  avatar.setAttribute('rounded', attributes.rounded)
  avatar.setAttribute('corner-radius', attributes.cornerRadius)
  avatar.setAttribute('uppercase', attributes.uppercase)
  avatar.setAttribute('text-weight', attributes.textWeight)
  avatar.setAttribute('text-scale', attributes.textScale)
  avatar.setAttribute('text-color', attributes.textColor)
  avatar.setAttribute('text-length', attributes.textLength)
  avatar.setAttribute('background-color', attributes.backgroundColor)
  avatar.setAttribute('border', attributes.border)
  avatar.setAttribute('border-color', attributes.borderColor)
  avatar.setAttribute('auto-color', attributes.autoColor)

  container.appendChild(avatar)

  const shapeElement = avatar.shadowRoot.getElementById('shape')
  const textElement = avatar.shadowRoot.getElementById('text')

  expect(avatar.attributes.length).toBe(Object.keys(attributes).length)
  expect(avatar.attributes['initials'].value).toBe(attributes.initials)
  expect(avatar.attributes['string'].value).toBe(attributes.string)
  expect(avatar.attributes['size'].value).toBe(attributes.size.toString())
  expect(avatar.attributes['rounded'].value).toBe(attributes.rounded.toString())
  expect(avatar.attributes['corner-radius'].value).toBe(
    attributes.cornerRadius.toString()
  )
  expect(avatar.attributes['uppercase'].value).toBe(
    attributes.uppercase.toString()
  )
  expect(avatar.attributes['text-weight'].value).toBe(
    attributes.textWeight.toString()
  )
  expect(avatar.attributes['text-scale'].value).toBe(
    attributes.textScale.toString()
  )
  expect(avatar.attributes['text-color'].value).toBe(attributes.textColor)
  expect(avatar.attributes['text-length'].value).toBe(
    attributes.textLength.toString()
  )
  expect(avatar.attributes['background-color'].value).toBe(
    attributes.backgroundColor
  )
  expect(avatar.attributes['border'].value).toBe(attributes.border.toString())
  expect(avatar.attributes['border-color'].value).toBe(attributes.borderColor)
  expect(avatar.attributes['auto-color'].value).toBe(
    attributes.autoColor.toString()
  )
  expect(textElement.innerText).toBe(
    attributes.initials.toUpperCase().substr(0, attributes.textLength)
  )
  expect(textElement.innerText.length).toBe(attributes.textLength)
  expect(textElement.style.transform).toBe(`scale(${attributes.textScale})`)
  expect(textElement.style.color).toBe(attributes.textColor)
  expect(textElement.style.fontWeight).toBe(attributes.textWeight.toString())
  expect(shapeElement.style.width).toBe(`${attributes.size}px`)
  expect(shapeElement.style.height).toBe(`${attributes.size}px`)
  expect(shapeElement.style.borderRadius).toBe(`${attributes.cornerRadius}px`)
  expect(shapeElement.style.backgroundColor).toBe(attributes.backgroundColor)
  expect(shapeElement.style.border).toBe(
    `${attributes.border}px solid ${attributes.borderColor}`
  )
})
