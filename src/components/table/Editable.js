import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { trim, isNil } from 'lodash'

function isEmpty (value) {
  return value === '' || isNil(value)
}

function formatContent (value) {
  return isEmpty(value) ? '<br>' : value
}

/*
 * input:
 * 1) '', undefined, null (empty) -> <br>
 * 2) number -> string
 * 3) string
 *
 * output:
 * 1) '' -> undefined/null
 * 2) string (number/string)
 */

class Editable extends Component {
  constructor (props) {
    super(props)
    this.content = this.props.content
    this.reset = this.reset.bind(this)
    this.save = this.save.bind(this)
    this.keyDown = this.keyDown.bind(this)
    this.blur = this.blur.bind(this)
  }

  reset () {
    this.input.innerHTML = formatContent(this.content)
  }

  save (content) {
    let toSave
    if (isEmpty(this.content)) {
      if (isEmpty(content)) return
    } else if (this.content.toString() === content) return

    console.log(this.content, content)
    toSave = content === '' ? null : content
    this.props.save && this.props.save(toSave)
    this.content = toSave
  }

  keyDown (e) {
    // console.log(e.key)
    if (e.key === 'Enter') {
      e.preventDefault()
      this.input.blur()
    } else if (e.key === 'Escape') {
      this.reset()
      this.input.blur()
    }
  }

  blur (e) {
    // FF 38.5 (Windows), innerText = undefined !!!
    // console.log(e.target.innerText, e.target.innerHTML)
    const content = trim(e.target.innerHTML).replace(/<br>$/, '')
    this.save(content)
  }

  render () {
    return (
      <div
        ref={input => { this.input = input }}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={this.keyDown}
        onBlur={this.blur}
        dangerouslySetInnerHTML={{
          __html: formatContent(this.props.content)
        }}
        />
    )
  }
}

Editable.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  save: PropTypes.func
}

export default Editable
