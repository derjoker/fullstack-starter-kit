import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { trim, isNil } from 'lodash'

function formatContent (value) {
  return (isNil(value) || value === '') ? '<br>' : value
}

function formatValue (content) {
  if (isNil(content)) return null
  const value = trim(content, /(&nbsp;)|(<br>)|(<div><br><\/div>)/)
  return value === '' ? null : value.toString()
}

class Editable extends Component {
  constructor (props) {
    super(props)
    this.reset = this.reset.bind(this)
    this.save = this.save.bind(this)
    this.keyDown = this.keyDown.bind(this)
    this.blur = this.blur.bind(this)
    this.state = {
      content: formatContent(this.props.content)
    }
  }

  reset () {
    this.input.innerHTML = this.state.content
  }

  save (content) {
    const value = formatValue(content)
    if (formatValue(this.state.content) === value) return

    this.props.save && this.props.save(value)
    this.setState({
      content: formatContent(value)
    })
  }

  keyDown (e) {
    const key = e.metaKey || e.ctrlKey
    // console.log(e.key)
    if (key && e.key === 'Enter') {
      this.input.blur()
    } else if (e.key === 'Escape') {
      this.reset()
      this.input.blur()
    }
  }

  blur (e) {
    const content = e.target.innerHTML
    this.save(content)
  }

  render () {
    return (
      <div
        ref={input => { this.input = input }}
        contentEditable
        suppressContentEditableWarning
        style={{ backgroundColor: '#fafafa' }}
        onKeyDown={this.keyDown}
        onBlur={this.blur}
        dangerouslySetInnerHTML={{
          __html: this.state.content
        }}
        />
    )
  }
}

Editable.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Editable
