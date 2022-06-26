import { Box, Button, Center, HStack, Image, Text, VStack, useToast, Link, Stack } from '@chakra-ui/react'
import { BigNumber, ethers } from 'ethers'
import React, { useState, useEffect } from 'react'
import twitterImage from "../../Assets/twitter.png"
import etherscanImage from "../../Assets/etherscan.png"
import openseaImage from "../../Assets/opensea.png"
import youtubeImage from "../../Assets/youtube.png"
import { FiBox } from "react-icons/fi"
import { BiWallet } from "react-icons/bi"
import { RiPassportLine } from "react-icons/ri"

import imagelogo from "../../Assets/dociallogo.png"
import colors from '../../Configs/colors'
import LoggedInRoutes from '../../Routes/Routes'
import CountDown from '../AppBarsComponents/CountDown'

function AppBarTop() {
  const [address, setAddress] = useState("")
  const toast = useToast()

  const handleLogin = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      await provider.send("eth_requestAccounts", []);
      const myAddress = await provider.getSigner().getAddress();
      setAddress(myAddress)
      toast({
        title: `You just connected with your wallet`,
        status: "success",
        isClosable: true,
        position: "top-right",
      })
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      })
    }
  }

  return (
    <Box >
    <Stack
      h="110px"
      display="flex"
      flexDirection="row"
      alignItems="center"
      w="full"
      position="fixed"
      justifyContent="space-between"
    >
      <HStack pl={6} spacing={0}>
      <Box>
              <Link href="https://twitter.com/Brokezuki12">
            <Button
              colorScheme={"black"}
              width={65}
            >
              <Image
                width={31}
                src={twitterImage}
              />
            </Button>
          </Link>
          </Box>
          <Box>
          <Link href="https://etherscan.io/address/0x3b0fDB79E1828F5fEc0b5dc6C3EB5B0856de1315">
            <Button
              colorScheme={"black"}

              width={100}
            >
              <Image width={31} src={etherscanImage} />
            </Button>
          </Link>
          </Box>
          <Box>
          <Link href="https://etherscan.io/address/0x3b0fDB79E1828F5fEc0b5dc6C3EB5B0856de1315">
            <Button
              colorScheme={"black"}

              width={100}
            >
              <Image width={31} src={openseaImage} />
            </Button>
          </Link>
          </Box>
        </HStack>
        <Box pr={7}>
          <Button bgColor="yellow.500" onClick={() => handleLogin()}>Connect Your Wallet</Button>
        </Box>
    </Stack>
  </Box>
  )
}

export default AppBarTop