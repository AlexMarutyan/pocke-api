import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";

const SearchInput = ({
  onChange,
  spellCheck,
  autoComplete,
  autoCapitalize,
  placeholder = "Search",
  ...rest
}: InputProps & {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <InputGroup {...rest}>
      <Input
        colorScheme="red"
        placeholder={placeholder}
        onChange={handleOnChange}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
      />
      <InputRightElement color="text">
        <BiSearch />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
