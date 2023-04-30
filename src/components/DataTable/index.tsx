import {
  Td,
  Tr,
  Th,
  Box,
  Table,
  Thead,
  Tbody,
  TableProps,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { get, isEmpty } from "lodash";

import DataLoaderState from "../DataLoaderState";
import Overlay from "./Overlay";

export type DataTableProps<Data extends object> = {
  data: Data[];
  queryResult: any;
  columns: ColumnDef<Data, any>[];
  columnVisibility?: Record<string, boolean>;
} & TableProps;

const DataTable = <Data extends object>({
  data,
  columns,
  size = "lg",
  queryResult,
  columnVisibility,
  variant = "classic",
}: DataTableProps<Data>) => {
  const table = useReactTable({
    columns,
    manualPagination: true,
    data: isEmpty(data) ? [] : data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      columnVisibility,
    },
  });

  return (
    <Box
      w="full"
      maxW="full"
      overflow="auto"
      position="relative"
      alignSelf="flex-start"
    >
      {queryResult.isFetching && <Overlay />}
      <Table size={size} variant={variant} whiteSpace="nowrap">
        <Thead bg="card">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  {...(get(header.column.columnDef, "styles")! as object)}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} borderBottomWidth={1}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <DataLoaderState
        {...queryResult}
        noResult={isEmpty(data)}
        showLoadingSpinner={false}
        emptyState={{ heading: "No corresponding data found" }}
      />
    </Box>
  );
};

export default DataTable;
