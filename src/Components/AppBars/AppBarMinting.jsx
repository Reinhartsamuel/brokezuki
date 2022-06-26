import { AspectRatio, Box, Button, Center, Flex, FormControl, Input, SimpleGrid, useToast, Stack, Text, VStack, Image, HStack, Heading } from '@chakra-ui/react'
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import colors from '../../Configs/colors';
import imageGif from "../../Assets/Brokezuki.gif"
import imageGifPass from "../../Assets/brokeZukipass.gif"


function AppBarMinting() {
  const [contractName, setContractName] = useState("")
  const [contractSymbol, setContractSymbol] = useState("")
  const [balanceOf, setBalanceOf] = useState()

  const [saleTime, setSaleTime] = useState()
  const [endTime, setEndTime] = useState()
  const currentTime = Math.floor(Date.now() / 1000);

  const [mintPrice, setMintPrice] = useState()
  const [freeMint, setFreeMint] = useState()
  const [counterFreeMint, setCounterFreeMint] = useState(0);

  // const [hour, setHour] = useState();
  // const [minute, setMinute] = useState();
  // const [seconds, setSeconds] = useState();
  const toast = useToast()
  const navigate = useNavigate()
  const [total, setTotal] = useState(1);
  
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const address = provider.getSigner().getAddress()

  const daiAddress = "0x3C3bb6d734808Af2e87E53a5Fd97D69115B8C02b";
  const daiAbi = [
    "function balanceOf(address) view returns (uint256)",
    "function startTime() view returns (uint256)",
    "function counterFreeMint() view returns (uint256)",
    "function mintPrice() view returns (uint256)",
    "function mint(uint256) external payable",
    "function getFreeMint(address) view returns (uint256)"
  ]
  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  const getContractData = async () => {
    const address = provider.getSigner().getAddress()
    try {

      const name = await daiContract.name()
      setContractName(name)

      const symbol = await daiContract.symbol()
      setContractSymbol(symbol)

      const startTime = await daiContract.startTime();
      setSaleTime(parseInt(startTime._hex))
      setEndTime(parseInt(startTime._hex) + 3600)

      const mintPrice = await daiContract.mintPrice(address)
      setMintPrice(parseInt(mintPrice._hex))

      const freeMint = await daiContract.getFreeMint(address)
      setFreeMint(parseInt(freeMint._hex))

      const counterFreemint = await daiContract.counterFreeMint();
      setCounterFreeMint(parseInt(counterFreemint._hex))

      const balance = await daiContract.balanceOf(address)
      setBalanceOf(parseInt(balance._hex))

      // countdown()
    } catch (error) {
      console.log(error)
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

    try {
      const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
      const mintContract = new ethers.Contract(daiAddress, daiAbi, signer);

      // const cost = Number(await mintContract.mintPrice())

      // const freeMint = await daiContract.getFreeMint(address)


      let reciept;

      try {
        reciept = await mintContract.mint(total);
      } catch (error) {
        console.log(error, 'ini error')
      }

      // // user has no freemint
      // if (freeMint <= 1 && saleTime >= currentTime && endTime <= currentTime) {
      //   reciept = await mintContract.mint(total);
      // }
      // // ini kalo bayar
      // else if (freeMint <= 3 && total <= 5 && saleTime >= currentTime && endTime <= currentTime) {
      //   const costNotFree = (cost * total)
      //   const costFree = (cost * freeMint)
      //   const costQty = String(costNotFree - costFree)
      //   const parse = ethers.utils.formatEther(costQty)
      //   const options = { value: ethers.utils.parseEther(parse) }
      //   reciept = await mintContract.mint(total, options);
      // }
      // // user has freemint but wants to pay more
      // else if (freeMint <= 3 && saleTime >= currentTime && endTime <= currentTime) {
      //   // total = userMints - freemint
      //   const costQty = String(cost * total)
      //   const parse = ethers.utils.formatEther(costQty)
      //   const options = { value: ethers.utils.parseEther(parse) }
      //   reciept = await mintContract.mint(total, options);
      // }
      // // user wants to pay no matter how many quantities
      // else {
      //   const costQty = String(cost * total)
      //   const parse = ethers.utils.formatEther(costQty)
      //   const options = { value: ethers.utils.parseEther(parse) }
      //   reciept = await mintContract.mint(total, options);
      // }

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
  }, [])
  

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