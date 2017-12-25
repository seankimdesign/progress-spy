import React from 'react'
import PropTypes from 'prop-types'

const Detail = ({ title, messages }) => {
  return (
    <li>
      <p>{title}</p>
      <pre>{messages}</pre>
    </li>
  )
}

export default Detail

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  messages: PropTypes.string.isRequired
}
