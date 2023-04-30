import {
  Tab,
  Box,
  Tabs,
  Flex,
  Text,
  Modal,
  Image,
  Center,
  TabList,
  TabPanel,
  TabPanels,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useQuery } from "@tanstack/react-query";

import { fetchPokemon } from "../../services/pokemons";
import DataLoaderState from "../DataLoaderState";
import BaseStats from "./Tabs/BaseStats";

export type PokemonDetails = {
  name: string;
};

const DetailsModal = ({
  name,
  onClose,
}: PokemonDetails & { onClose: () => void }) => {
  const { data, isError, isLoadingError, isLoading, isFetching } = useQuery(
    ["fetchPokemon"],
    () => fetchPokemon(name)
  );

  return (
    <Modal
      isOpen
      onClose={onClose}
      scrollBehavior="inside"
      size={{ base: "full", xl: "6xl" }}
    >
      <ModalOverlay />
      <ModalContent h="90%" borderRadius="3xl">
        <ModalCloseButton top={3.5} />
        <ModalHeader bg="container" borderTopRadius="inherit">
          Pokemon Details
        </ModalHeader>
        <ModalBody
          p={8}
          display="flex"
          flexDir="column"
          borderBottomRadius="inherit"
        >
          <DataLoaderState
            isError={isError}
            isLoading={isLoading}
            isFetching={isFetching}
            isLoadingError={isLoadingError}
          />
          {!isEmpty(data) && (
            <Flex flex={1} gap={8} flexDir={{ base: "column", lg: "row" }}>
              <Flex
                w="full"
                flexDir="column"
                borderRadius="3xl"
                maxW={{ lg: "30%" }}
              >
                <Flex
                  flex={1}
                  borderWidth={1}
                  flexDir="column"
                  textAlign="center"
                  borderRadius="3xl"
                  bg={`pokemon.${data?.types[0].type.name}`}
                >
                  <Text
                    px={4}
                    py={2}
                    fontSize="3xl"
                    color="gray.400"
                    fontWeight="bold"
                    alignSelf="flex-end"
                  >
                    # {data?.id}
                  </Text>
                  <Text
                    mt={4}
                    mb={12}
                    fontSize="2xl"
                    color="gray.400"
                    fontWeight="bold"
                    textTransform="capitalize"
                  >
                    {name}
                  </Text>
                  <Box
                    py={4}
                    mt={10}
                    flex={1}
                    bg="container"
                    borderRadius="3xl"
                    position="relative"
                    boxShadow="0px -4px 10px rgba(50, 50, 50, 0.75)"
                    sx={{
                      textAlign: "start",
                      p: {
                        py: 2,
                        px: 4,
                        fontSize: "lg",
                        fontWeight: "bold",
                        span: {
                          ml: 3,
                          opacity: 0.5,
                          fontWeight: "normal",
                        },
                      },
                    }}
                  >
                    <Center
                      top={-16}
                      left="50%"
                      boxSize={24}
                      position="absolute"
                      transform="translateX(-50%)"
                    >
                      <Image
                        objectFit="contain"
                        alt="Pokemon image"
                        src={data?.sprites?.other.dream_world.front_default}
                      />
                    </Center>
                    <Text mt={8}>
                      Type:
                      <Text as="span" textTransform="capitalize">
                        {data?.types[0].type.name}
                      </Text>
                    </Text>
                    <Text>
                      Weight:
                      <Text as="span">{data?.height} kg</Text>
                    </Text>
                    <Text>
                      Height:
                      <Text as="span">{data?.weight} cm</Text>
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Tabs flex={1} p={4} bg="container" borderRadius="3xl">
                <TabList
                  sx={{ button: { fontWeight: "bold", fontSize: "lg" } }}
                >
                  <Tab>Base Stats</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <BaseStats stats={data?.stats} />
                  </TabPanel>
                  <TabPanel>More data here in feature</TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailsModal;
