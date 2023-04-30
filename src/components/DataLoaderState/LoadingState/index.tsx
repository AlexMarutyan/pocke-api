import {
  Center,
  Spinner,
  CenterProps,
  useColorModeValue,
} from "@chakra-ui/react";

const LoadingSpinner = (props: CenterProps) => {
  const color = useColorModeValue("purple.600", "white");
  return (
    <Center {...props} w="full">
      <Spinner size="lg" color={color} />
    </Center>
  );
};

export default LoadingSpinner;
