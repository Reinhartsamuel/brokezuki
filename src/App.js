import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import './App.css';
import LoggedInRoutes from './Routes/Routes';
import notConnection from './Pages/notConnection';
import { RiAlarmWarningFill } from 'react-icons/ri';
import colors from './Configs/colors';


function App() {
  
  const getWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    try {
      const myAddress = await provider.getSigner().getAddress();
      return (myAddress)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWallet()
  
    return () => {
    }
  }, [])
  


  
  return (
    <Box>
      {window.ethereum ? (
      <LoggedInRoutes />
      ) : (
        <Flex height={"100vh"} justifyContent="center" >
        <Center flexDirection={"column"}>
            <Box>
              < RiAlarmWarningFill color={colors.light} size="5xl" />
            </Box>
            <Flex flexDirection={"column"} alignItems="center" marginTop={10}>
                <Text fontWeight={"bold"} fontSize={32} color={colors.light}>Ooops!</Text>
                <Text marginTop={5} fontWeight={"bold"} fontSize={32} color={colors.light}>METAMASK NOT FOUND!</Text>
                {/* <Button onClick={goingBack} marginTop={5} borderRadius={"full"}>Back to Home</Button> */}
            </Flex>
        </Center>
    </Flex>
      )}
    </Box>
  )
}

export default App;