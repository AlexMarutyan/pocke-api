import { useMemo } from "react";
import { Flex } from "@chakra-ui/react";
import { map, get, flatten, isEmpty } from "lodash";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  fetchPokemons,
  fetchPokemonsInCardView,
} from "../../../services/pokemons";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { useAppSelector } from "../../../store/hooks";
import DataLoaderState from "../../DataLoaderState";
import CardItem from "../../CardItem";

export const CardView = () => {
  const perPage = useAppSelector((state) => state.filters.perPage);

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

  const currentData = useMemo(
    () => flatten(map(get(data, "pages"), "results")),

    [data]
  );

  return (
    <>
      <Flex
        px={4}
        gap={4}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {map(currentData, (item) => (
          <CardItem key={item?.name} name={item?.name} />
        ))}
      </Flex>
      <DataLoaderState
        loader={loader}
        {...queryResult}
        noResult={isEmpty(currentData)}
        emptyState={{ heading: "No corresponding data found" }}
      />
    </>
  );
};
