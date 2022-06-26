import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FaCopy } from "react-icons/fa";
import colors from "../Configs/colors";


function addressHelper(address, to) {
  const wallet = `${String(address).slice(0, 4)}...${String(address).slice(
    -4
  )}`;
    

  return (
    <Flex flexDirection="row" alignItems="center">
      <Box>
      <Text>{wallet}</Text>
      </Box>
      <Box ml={3}>
      <IconButton
          size="sm"
          icon={<FaCopy />}
          color={colors.light}
          onClick={() => navigator.clipboard.writeText(address)}
                />
      </Box>
    </Flex>
    );
}

export default addressHelper;
