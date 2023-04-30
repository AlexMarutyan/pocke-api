import { filter, includes, map } from "lodash";
import { useLocation } from "react-router-dom";
import { Box, Tag, Flex, Text, Select } from "@chakra-ui/react";

import {
  setTypes,
  setSearch,
  setPerPage,
} from "../../store/pokemonFiltersSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import SearchInput from "../SearchInput";

export const pokemonTypes = [
  "bug",
  "fire",
  "rock",
  "water",
  "fairy",
  "grass",
  "poison",
  "ghost",
  "normal",
  "electric",
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { types, perPage } = useAppSelector((state) => state.filters);

  const isInitialPage = pathname === "/";

  const handleTypeClick = (clickedType: string) => {
    const filteredTypes = filter(types, (type) => type !== clickedType);

    if (filteredTypes.length < types.length) {
      dispatch(setTypes(filteredTypes));
    } else {
      dispatch(setTypes([...types, clickedType]));
    }
  };

  return (
    <Flex
      p={4}
      gap={4}
      as="aside"
      bg="wrapper"
      flexDir="column"
      borderRadius="3xl"
      w={{ base: "full", lg: "30vw" }}
    >
      {isInitialPage && (
        <Box>
          <Text pb={2} fontWeight="semibold">
            Search pokemons
          </Text>
          <SearchInput
            borderRadius="inherit"
            onChange={(event) => {
              dispatch(setSearch(event.target.value));
            }}
          />
        </Box>
      )}
      <Box>
        <Text pb={2} fontWeight="semibold">
          Pokemons on page
        </Text>
        <Select
          value={perPage}
          onChange={(event) => {
            dispatch(setPerPage(event.target.value));
          }}
        >
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </Select>
      </Box>
      {!isInitialPage && (
        <Box>
          <Text pb={2} fontWeight="semibold">
            Pokemons types
          </Text>
          <Flex gap={4} flexWrap="wrap">
            {map(pokemonTypes, (type) => (
              <Tag
                px={4}
                color="white"
                cursor="pointer"
                colorScheme="blue"
                display="flex"
                size="md"
                onClick={() => handleTypeClick(type)}
                {...(includes(types, type) && { bg: "blue.500" })}
              >
                {type}
              </Tag>
            ))}
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default Sidebar;
