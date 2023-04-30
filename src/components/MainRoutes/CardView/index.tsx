import { useMemo } from "react";
import { Flex } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { map, get, flatten, isEmpty, filter } from "lodash";

import {
  fetchPokemons,
  fetchPokemonsInCardView,
} from "../../../services/pokemons";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { stringsIncludes } from "../../../utils/string";
import { useAppSelector } from "../../../store/hooks";
import DataLoaderState from "../../DataLoaderState";
import CardItem from "../../CardItem";

export const CardView = () => {
  const { search, perPage } = useAppSelector((state) => state.filters);

  const { data, hasNextPage, fetchNextPage, ...queryResult } = useInfiniteQuery(
    ["fetchPokemonsInCardView", { limit: perPage }],
    fetchPokemons,
    {
      keepPreviousData: true,
      getNextPageParam: (data) => {
        return data?.next;
      },
    }
  );

  const handleFetchAdditionalData = (isInView: boolean) => {
    if (isInView && hasNextPage && !queryResult?.isFetching) {
      fetchNextPage();
    }
  };

  const loader = useIntersectionObserver(handleFetchAdditionalData);

  const filteredData = useMemo(() => {
    let currentData = flatten(map(get(data, "pages"), "results"));

    if (!isEmpty(search)) {
      return filter(currentData, ({ name }) => stringsIncludes(name, search));
    }

    return currentData;
  }, [data, search]);

  return (
    <>
      <Flex
        px={4}
        gap={4}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {map(filteredData, (item) => (
          <CardItem key={item?.name} name={item?.name} />
        ))}
      </Flex>
      <DataLoaderState
        loader={loader}
        {...queryResult}
        noResult={isEmpty(filteredData)}
        emptyState={{ heading: "No corresponding data found" }}
      />
    </>
  );
};
