import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import AppBarFooter from '../Components/AppBars/AppBarFooter'
import AppBarMinting from '../Components/AppBars/AppBarMinting'
import AppBarTop from '../Components/AppBars/AppBarTop'

const MintingPages = () => {

  return (
    <>
    <AppBarTop />
    <AppBarMinting />
    <AppBarFooter />
    </>
  )
}

export default MintingPages