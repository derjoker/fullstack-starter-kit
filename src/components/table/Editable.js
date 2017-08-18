import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { trim, toString } from 'lodash'

function formatContent (value) {
  return value === '' ? '<br>' : value
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
    this.state = {
      content: toString(this.props.content) // undefined, null -> ''
    }
  }

  reset () {
    this.input.innerHTML = this.state.content
  }

  save (content) {
    if (this.state.content === content) return

    console.log(this.state.content, content)
    this.props.save && this.props.save(formatValue(content))
    this.setState({
      content: content
    })
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
          __html: formatContent(this.state.content)
        }}
        />
    )
  }
}

Editable.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Editable
