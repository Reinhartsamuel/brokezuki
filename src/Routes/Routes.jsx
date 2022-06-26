import { Box } from '@chakra-ui/react'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MintingPages from '../Pages/MintingPages'
import notConnection from '../Pages/notConnection'

const LoggedInRoutes = (  ) => {


  return (
        <Routes>
            <Route path="/" element={<MintingPages />} />
        </Routes>
  )
}

export default LoggedInRoutes