import { isEmpty } from "lodash";
import { LegacyRef } from "react";
import { Box, Center } from "@chakra-ui/react";

import EmptyState, { EmptyStateProps } from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export type DataLoaderStateProps = {
  isError: boolean;
  refetch?: Function;
  noResult?: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isLoadingError: boolean;
  emptyState?: EmptyStateProps;
  showLoadingSpinner?: boolean;
  hasNextPage?: boolean | undefined;
  loader?: LegacyRef<any> | undefined;
};

const DataLoaderState = ({
  loader,
  refetch,
  isError,
  noResult,
  isLoading,
  isFetching,
  emptyState,
  isLoadingError,
  showLoadingSpinner = true,
}: DataLoaderStateProps) => (
  <>
    {!isLoading ? (
      <Center flexDir="column" flex={noResult || isLoadingError ? 1 : 0}>
        {isError
          ? !isFetching && (
              <ErrorState refetch={refetch} hasIcon={isLoadingError} />
            )
          : !isFetching &&
            noResult &&
            !isEmpty(emptyState) && <EmptyState py={10} {...emptyState} />}
      </Center>
    ) : (
      showLoadingSpinner && (
        <Center h="full" flex={1} flexDir="column">
          <LoadingState />
        </Center>
      )
    )}
    {loader && <Box ref={loader} />}
  </>
);

export default DataLoaderState;
