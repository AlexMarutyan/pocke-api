import {
  Center,
  Spinner,
  CenterProps,
  useColorModeValue,
} from "@chakra-ui/react";

const Overlay = ({ ...rest }: CenterProps) => {
  const spinnerColor = useColorModeValue("purple.600", "cyan.500");
  const overlayBG = useColorModeValue("whiteAlpha.600", "blackAlpha.600");

  return (
    <Center
      top={0}
      left={0}
      right={0}
      bottom={0}
      pos="absolute"
      zIndex="overlay"
      bg={overlayBG}
      {...rest}
    >
      <Spinner size="md" thickness="3px" color={spinnerColor} />
    </Center>
  );
};

export default Overlay;
