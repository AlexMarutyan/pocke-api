import {
  Link,
  List,
  Flex,
  Image,
  ListItem,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
// @ts-ignore
import logo from "../../images/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      py={4}
      px={5}
      right={5}
      as="header"
      bg="blue.900"
      alignItems="center"
      borderRadius="full"
      justifyContent="space-between"
    >
      <Image alt="logo" src={logo} boxSize={8} />
      <List
        gap={10}
        display="flex"
        colorScheme="blue"
        sx={{ a: { fontSize: "lg", fontWeight: "bold" } }}
      >
        <ListItem>
          <Link
            to="/"
            color="white"
            as={RouterLink}
            _hover={{ color: "blue.300" }}
          >
            Table
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/cards"
            as={RouterLink}
            color="white"
            _hover={{ color: "blue.300" }}
          >
            Cards
          </Link>
        </ListItem>
      </List>
      <IconButton
        colorScheme="blue"
        borderRadius="full"
        onClick={toggleColorMode}
        aria-label="Toggle color mode"
      >
        {colorMode === "light" ? <BsMoonFill /> : <BsFillSunFill />}
      </IconButton>
    </Flex>
  );
};

export default Header;
