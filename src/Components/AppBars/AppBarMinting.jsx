import { AspectRatio, Box, Button, Center, Flex, FormControl, Input, SimpleGrid, useToast, Stack, Text, VStack, Image, HStack, Heading } from '@chakra-ui/react'
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import colors from '../../Configs/colors';
import imageGif from "../../Assets/Brokezuki.gif"
import imageGifPass from "../../Assets/brokeZukipass.gif"


function AppBarMinting() {
  const [balanceOf, setBalanceOf] = useState()
  const [addressWallet, setAddressWallet] = useState()
  const toast = useToast()
  const [total, setTotal] = useState(1);
  
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const daiAddress = "0x3C3bb6d734808Af2e87E53a5Fd97D69115B8C02b";

  const daiAbi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint256)",
    "function mint(uint256) external payable",
    "function cost() view returns (uint256)"
  ]

  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  const getContractData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const address = await provider.getSigner().getAddress()
    
    try {
      const address = await provider.getSigner().getAddress()
      setAddressWallet(address)
      const balance = await daiContract.balanceOf(address)
      setBalanceOf(parseInt(balance._hex))
      const pricemint = await daiContract.cost()
      console.log(parseInt(pricemint._hex))
    } catch (error) {
      console.log(error, 'ini error name')
    }
  }

  const _addNumber = () => {
    if (total === 3) {
      return null;
    }
    return setTotal(total + 1);
  };

  const _minusNumber = () => {
    if (total > 1) return setTotal(total - 1);
  };
  
  const handleMint = async () => {
    console.log(balanceOf, 'ini balance orang')

    try {
      const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
      const mintContract = new ethers.Contract(daiAddress, daiAbi, signer);
      const cost = Number(await mintContract.cost())

      let reciept;
      
      if (balanceOf <= 1 && total <= 1){
        reciept = await mintContract.mint(total);
      }else if(balanceOf <= 1 && total >= 1){
        const freeCost = 1
        const newQuantity = total - freeCost

        const costMint = (cost * newQuantity)
        const costQty = String(costMint)
        const parse = ethers.utils.formatEther(costQty)
        const options = { value: ethers.utils.parseEther(parse) }
        reciept = await mintContract.mint(total, options);
      }
      else if(balanceOf <= 9 && total >= 9 ){
        toast({
          title: `Error limit minting`,
          status: "error",
          isClosable: true,
          position: "top-right",
        })
      }
      else {
        const costQty = String(cost * total)
        const parse = ethers.utils.formatEther(costQty)
        const options = { value: ethers.utils.parseEther(parse) }
        reciept = await mintContract.mint(total, options);
      }


      let recieptor = await reciept.wait();

      if (recieptor) {
        toast({
          title: `Success, you just mint ${total} passes`,
          status: "success",
          isClosable: true,
          position: "top-right",
        })
        // setTimeout(() => {
        //     navigate("/success")
        //   }, 3000);
      }
    } catch (error) {
      console.log(error)
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      })
    }
  }

  useEffect(() => {
    getContractData()
  
    return () => {
    }
  }, [addressWallet])
  

  return (
    <Box bgImage={imageGif} bgSize="cover" bgRepeat='no-repeat'  w='full' h='100vh'>
      <Box>
        <Center>
        <Box >
          <Center>
            <Box my={5}>
              <VStack>
                <Box>
                  <Text
                    textAlign="center"
                    fontSize="350%"
                    fontWeight="extrabold"
                    letterSpacing={2}
                    color={colors.black}
                    mx={10}
                  >
                    BROKEZUKI
                  </Text>

                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Flex flexDirection="column">
                    <Text color={colors.black} fontSize="150%" textAlign="center">
                      TOTAL 3.333 NFTs
                    </Text>
                  </Flex>
                </Box>
                <Box>
                  <Box
                    px={7}
                    py={7}
                    borderRadius={30}
                    boxShadow="dark-lg"
                    mb={10}
                    w="350px"
                    bgColor="blackAlpha.400"
                  >
                    <Box display={"flex"} flexDirection={"column"}>
                      <Box>
                        <AspectRatio ratio={1}>
                          <Image
                            bg="#ffd600"
                            src={imageGifPass}
                            borderRadius="xl"
                            shadow="dark-lg"
                          />
                        </AspectRatio>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Stack
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  w="70%"
                >
                  {console.log(balanceOf, 'address')}
                  {addressWallet ? (
                    balanceOf < 9 ? (                  
                      <Box maxWidth="full">
                        <>
                          <Box
                            maxWidth={400}
                            alignSelf="center"
                            justifyContent={"center"}
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems="center"
                          >
                            <Box
                              maxWidth="100%"
                              display={"flex"}
                              flexDirection="row"
                              alignItems={"center"}
                              flexWrap={"wrap"}
                              justifyContent="center"
                            >
                              <FormControl
                                marginY={2}
                                display={"flex"}
                                flexDirection="row"
                                width={300}
                              >
                                <Button
                                  //   isLoading={contract.current === undefined}
                                  type="button"
                                  onClick={_minusNumber}
                                  backgroundColor={colors.text}
                                  color={colors.black}
                                  mr={2}
                                  shadow="dark-lg"
                                >
                                  -
                                </Button>
                                <Input
                                  readOnly
                                  textAlign={"center"}
                                  id="total"
                                  type="number"
                                  defaultValue={0}
                                  bgColor={colors.white}
                                  onChange={(e) => setTotal(e.target.value)}
                                  value={total}
                                  color={colors.black}
                                  max="3"
                                />
                                <Button
                                  //   isLoading={contract.current === undefined}
                                  backgroundColor={colors.text}
                                  color={colors.black}
                                  onClick={_addNumber}
                                  ml={2}
                                  shadow="dark-lg"
                                >
                                  +
                                </Button>
                              </FormControl>
                              <Box mt={3}>
    
                                <Button
                                  display={"flex"}
                                  paddingY={2}
                                  height={"auto"}
                                  justifyContent="center"
                                  backgroundColor={colors.text}
                                  onClick={() => handleMint()}
                                  boxShadow="lg"
                                >
    
                                  <Text color={colors.black} fontWeight="bold">
                                    Minting Now !
                                  </Text>
                                </Button>
                              </Box>
                            </Box>
                            {/* <Box
                          marginTop={2}
                          justifyContent={"center"}
                          borderRadius={12}
                          width={200}
                          backgroundColor={"black"}
                        >
                          {contract.current === undefined ? (
                            <Spinner color="white" />
                          ) : (
                            <Text color={"white"} fontWeight={800}>
                              {data.totalSupply + total}/{data.maxSupply}
                            </Text>
                          )}
                        </Box> */}
                          </Box>
                        </>
                      </Box>
                      ) : (<>
                      <Heading textAlign="center" color={colors.dark}>Your already have 9 NFTs in your wallet</Heading>
                      </>) 
                  ) : (
                    <Heading textAlign="center" color={colors.dark}>Please Connect Your Wallet !</Heading>
                  )}
                </Stack>
              </VStack>
              <Box  my={5} mx={25} py={5} bgColor={colors.light} borderRadius={10}>
                <Text
                  color={colors.black}
                  fontSize={15}
                  fontWeight="bold"
                  textAlign="center"
                >
                  Price 0.0033
                </Text>
                <Text
                  color={colors.black}
                  fontSize={15}
                  fontWeight="bold"
                  textAlign="center"
                >
                 Free 1 per wallet
                </Text>
                <Text
                  color={colors.black}
                  fontSize={15}
                  fontWeight="bold"
                  textAlign="center"
                >
                  Max mint 3 per transaction
                </Text>
                <Text
                  color={colors.black}
                  fontSize={15}
                  fontWeight="bold"
                  textAlign="center"
                >
                  Max mint 9 per wallet
                </Text>
              </Box>
            </Box>
          </Center>
        </Box>
 
        </Center>
      </Box>
    </Box>
  )
}

export default AppBarMinting