import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const _Banner = styled.div`
  text-align: center;
  background-color: #282c34;
  padding: 20px 0;
  margin: 0 0 12px 0;
`

const Image = styled.img`
  width: 310px;
`

const Banner = ({ src }) => {
  return (
    <_Banner>
      <Image src={src} />
    </_Banner>
  )
}

export default Banner

Banner.propTypes = {
  src: PropTypes.string.isRequired
}
