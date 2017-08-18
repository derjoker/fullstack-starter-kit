import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { trim, isNil } from 'lodash'

function formatContent (value) {
  return (isNil(value) || value === '') ? '<br>' : value
}

function formatValue (content) {
  return content === '' ? null : content
}

class Editable extends Component {
  constructor (props) {
    super(props)
    this.reset = this.reset.bind(this)
    this.save = this.save.bind(this)
    this.keyDown = this.keyDown.bind(this)
    this.blur = this.blur.bind(this)
  }

  reset () {
    this.input.innerHTML = formatContent(this.content)
  }

  save (content) {
    if (this.props.content === content) return

    console.log(this.props.content, content)
    this.props.save && this.props.save(content)
    this.content = content
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
    this.save(formatValue(content))
  }

  render () {
    this.content = this.props.content
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
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Editable
