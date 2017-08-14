import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Editable extends Component {
  constructor (props) {
    super(props)
    this.keyDown = this.keyDown.bind(this)
    this.blur = this.blur.bind(this)
    this.state = {
      content: this.props.content
    }
  }

  keyDown (e) {
    const key = e.metaKey || e.ctrlKey
    if (key && e.key === 'Enter') {
      const value = e.target.innerText
      this.setState({
        content: value
      })
      // save
      this.props.save && this.props.save(value)
      this.input.blur()
    }
  }

  blur () {
    // reset
    this.input.innerText = this.state.content
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
