import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { Box, Heading, Button, Flex, Progress, Text } from '@chakra-ui/react'
import colors from '../../Configs/colors'
import { useCountdown } from './useCountdown';


const CountDown = (props) => {
    const timeSale = props.saleTimes
    const currentTime = Math.floor(Date.now() / 1000);

    const [progress, minutes, seconds] = useCountdown(currentTime);

    
    


    return (
        <Box
        borderColor="gray.200"
        borderWidth="1px"
        rounded="md"
        bg="white"
        p={[1, 8]}
        my="4"
        w="100%"
      >
        <Flex flexDirection="row" width="100%" alignItems="center">
          <Progress value={progress} height="5px" w="90%" grow={1} color={colors.light} />
          <Text ml="auto">{`${minutes}:${seconds}`}</Text>
        </Flex>
      </Box>
    )

}

export default CountDown;