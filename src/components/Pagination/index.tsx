import { useEffect, RefObject } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { Box, chakra, useBreakpointValue } from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const AppPagination = chakra(ReactPaginate);

type PaginationProps = {
  onPageChange: (page: number) => void;
  scrollToRef?: RefObject<HTMLElement>;
} & Omit<ReactPaginateProps, "onPageChange" | "marginPagesDisplayed">;

const Pagination = (props: PaginationProps) => {
  const { forcePage, pageCount, scrollToRef, onPageChange, ...rest } = props;
  const marginPagesDisplayed = useBreakpointValue({
    base: 0,
    sm: 1,
    md: 3,
    xl: 5,
  });

  const handlePageChange = (event: any) => {
    onPageChange(event.selected);
  };

  useEffect(() => {
    scrollToRef?.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [forcePage, scrollToRef]);

  return (
    <Box
      as="nav"
      w="full"
      userSelect="none"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <AppPagination
        display="flex"
        listStyleType="none"
        pageCount={pageCount ?? 0}
        justifyContent="space-between"
        onPageChange={handlePageChange}
        nextLabel={<RiArrowRightSLine />}
        previousLabel={<RiArrowLeftSLine />}
        marginPagesDisplayed={marginPagesDisplayed}
        forcePage={pageCount > 1 && forcePage ? forcePage - 1 : undefined}
        {...rest}
        sx={{
          py: 2,
          bg: "card",
          li: {
            boxSize: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: {
              base: 1,
              sm: 1.5,
            },
          },
          ".selected": {
            px: 2,
            bg: "text",
            fontWeight: "bold",
            borderRadius: "full",
          },
          ".previous, .next": {
            fontSize: "xl",
            display: "flex",
            alignItems: "center",
          },
        }}
      />
    </Box>
  );
};

export default Pagination;
