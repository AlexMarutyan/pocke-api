import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import Sidebar from "../components/SideBar";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <Flex p={8} h="full" minH="100vh" gap={8} flexDir="column">
      <Header />
      <Flex
        gap={8}
        flex={1}
        flexDir={{ base: "column", lg: "row" }}
        sx={{ "aside, main": { bg: "wrapper", boxShadow: "0px 0px 2px" } }}
      >
        <Sidebar />
        <Box w="full" py={10} flex={1} as="main" borderRadius="3xl">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default RootLayout;
