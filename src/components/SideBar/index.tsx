import { Box, Flex, Text, Select } from "@chakra-ui/react";

import { setPerPage, setSearch } from "../../store/pokemonFiltersSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import SearchInput from "../SearchInput";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { perPage } = useAppSelector((state) => state.filters);

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
    </Flex>
  );
};

export default Sidebar;
