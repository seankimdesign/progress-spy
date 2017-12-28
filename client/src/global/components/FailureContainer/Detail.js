import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const _Detail = styled.li`
  border-top: 1px dashed #7a7272;
  padding-left: 15px;
  margin-left: -15px;
  
  &:first-of-type{
    border: 0;
  }
`

const Title = styled.p`
  font-size: 15px;
`

const Detail = ({ title, messages }) => {
  return (
    <_Detail>
      <Title>{title}</Title>
      <pre>{messages}</pre>
    </_Detail>
  )
}

export default Detail

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  messages: PropTypes.string.isRequired
}
