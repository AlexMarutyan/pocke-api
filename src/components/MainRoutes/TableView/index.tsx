import { TbEye } from "react-icons/tb";
import { map, filter, isEmpty } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Text, IconButton } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

import { setCount, setSearch } from "../../../store/pokemonFiltersSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import DetailsModal, { PokemonDetails } from "../../DetailsModal";
import { fetchPokemons } from "../../../services/pokemons";
import usePagination from "../../../hooks/usePagination";
import { stringsIncludes } from "../../../utils/string";
import Pagination from "../../Pagination";
import DataTable from "../../DataTable";

export const TableView = () => {
  const dispatch = useAppDispatch();
  const { count, search, perPage } = useAppSelector((state) => state.filters);
  const { pagination, setPagination } = usePagination(perPage);
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  const { data, ...queryResult } = useQuery(
    ["fetchPokemons", { ...pagination }],
    fetchPokemons,
    {
      keepPreviousData: true,
      select: (data) => {
        return {
          ...data,
          results: map(data?.results, (item) => ({
            ...item,
            name: item?.name.replace(/-/g, " "),
          })),
        };
      },
    }
  );

  const filteredData = useMemo(() => {
    let currentData = data?.results;

    if (!isEmpty(search)) {
      currentData = filter(currentData, ({ name }) =>
        stringsIncludes(name, search)
      );
    }

    return currentData;
  }, [search, data?.results]);

  const handlePageChange = (page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      offset: page * prevState?.limit,
    }));

    if (!isEmpty(search)) {
      dispatch(setSearch(""));
    }
  };

  const handleShowDetails = (url: string, name: string) => {
    setDetails({
      name,
    });
  };

  const handleCloseDetails = () => {
    setDetails(null);
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "name",
        accessorKey: "name",
        cell: (info) => (
          <Text textTransform="capitalize">{info.getValue() as string}</Text>
        ),
      },
      {
        header: "Details",
        styles: { width: 10 },
        cell: (info) => {
          const data = info.row.original;
          return (
            <IconButton
              ml="50%"
              size="sm"
              icon={<TbEye />}
              colorScheme="blue"
              onClick={() => {
                handleShowDetails(data?.url, data?.name);
              }}
              aria-label="Show pokemon details"
            />
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (data?.count && count !== data?.count) {
      dispatch(setCount(data?.count));
    }
  }, [data?.count]);

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredData}
        queryResult={queryResult}
      />
      <Pagination
        onPageChange={handlePageChange}
        {...(pagination?.offset === 0 && { forcePage: 1 })}
        pageCount={data?.count ? Math.floor(data?.count / pagination.limit) : 0}
      />
      {!isEmpty(details) && (
        <DetailsModal {...details} onClose={handleCloseDetails} />
      )}
    </>
  );
};
