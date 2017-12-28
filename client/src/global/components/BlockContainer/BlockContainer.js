import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const _BlockContainer = styled.div`
  margin: 4px 0;
`

const _Block = styled.div`
  display: inline-block;
  margin: 4px;
  width: 40px;
  height: 20px;
  border-radius: 2px;
  background-color: ${props => props.color}
`

const BlockContainer = ({ color, number }) => {
  return (
    <_BlockContainer>
      {Array.apply(null, { length: number }).map((empty, i) => <_Block color={color} key={i} />)}
    </_BlockContainer>
  )
}

export default BlockContainer

BlockContainer.propTypes = {
  color: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
}

BlockContainer.defaultProps = {
  color: '#ccc'
}
