import { toLower, includes } from "lodash";

export const stringsIncludes = (str1: string, str2: string) =>
  includes(
    toLower(str1).trim().replace(/  +/g, " "),
    toLower(str2).trim().replace(/  +/g, " ")
  );
