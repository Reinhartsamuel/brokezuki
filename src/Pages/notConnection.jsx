import { Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const notConnection = () => {
  return (
    <Flex height={"100vh"} justifyContent="center">
            <Center flexDirection={"column"}>
                {/* <Image maxWidth={500} src={Icon404} /> */}
                <Flex flexDirection={"column"} alignItems="center" marginTop={10}>
                    <Text fontWeight={"bold"} fontSize={32}>Ooops!</Text>
                    <Text marginTop={5} fontWeight={"bold"} fontSize={32}>PAGE NOT FOUND!</Text>
                    {/* <Button onClick={goingBack} marginTop={5} borderRadius={"full"}>Back to Home</Button> */}
                </Flex>
            </Center>
        </Flex>
  )
}

export default notConnection