import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import { semanticTokens } from "./semantic-tokens";
import foundations from "./foundations";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  semanticTokens,
  ...foundations,
});

export default theme;
