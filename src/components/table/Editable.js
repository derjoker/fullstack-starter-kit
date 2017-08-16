import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { trim, isNil } from 'lodash'

function formatContent (content) {
  return (isNil(content) || content === '') ? '<br>' : content
}

function formatValue (content) {
  if (content === undefined) return null
  const value = trim(trim(content), '<br>')
  return value === '' ? null : value
}

class Editable extends Component {
  constructor (props) {
    super(props)
    this.keyDown = this.keyDown.bind(this)
    this.blur = this.blur.bind(this)
    this.state = {
      content: formatContent(this.props.content)
    }
  }

  keyDown (e) {
    const key = e.metaKey || e.ctrlKey
    // console.log(e.key)
    if (key && e.key === 'Enter') {
      const content = e.target.innerHTML
      this.setState({
        content: formatContent(content)
      })
      // save
      const value = formatValue(content)
      this.props.save && this.props.save(value)
      this.input.blur()
    } else if (e.key === 'Escape') {
      this.input.blur()
    }
  }

  blur () {
    // reset
    // console.log('blur', this.state.content)
    this.input.innerHTML = this.state.content
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
