import { isFunction } from "lodash";
import { IoMdRefresh } from "react-icons/io";
import {
  Alert,
  Button,
  AlertIcon,
  AlertTitle,
  AlertProps,
} from "@chakra-ui/react";

type FetchErrorProps = {
  title?: string;
  hasIcon?: boolean;
  refetch?: Function;
};

const FetchError = ({
  refetch,
  hasIcon = true,
  title = "Failed to fetch data.",
}: FetchErrorProps) => (
  <Alert
    status="error"
    bg="transparent"
    alignItems="center"
    py={hasIcon ? 8 : 2}
    flexDirection="column"
    justifyContent="center"
  >
    {hasIcon && <AlertIcon mr={0} boxSize={10} />}
    <AlertTitle mt={hasIcon ? 4 : 1} mb={1} fontSize="lg">
      {title}
    </AlertTitle>
    {isFunction(refetch) && (
      <Button
        variant="link"
        iconSpacing={1}
        onClick={refetch}
        rightIcon={<IoMdRefresh />}
      >
        Refetch
      </Button>
    )}
  </Alert>
);

export default FetchError;
