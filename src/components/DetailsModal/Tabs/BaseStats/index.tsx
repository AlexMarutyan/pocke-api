import { map } from "lodash";
import { Box, Text, Flex, Progress } from "@chakra-ui/react";

const BaseStats = ({ stats }: { stats: any }) => (
  <Flex gap={8} flexDir="column">
    {map(stats || Array(4).fill(null), ({ base_stat, stat }) => (
      <Box py={1} key={stat?.name}>
        <Text mb={2} fontSize="lg" textTransform="capitalize">
          {stat?.name.replace(/-/g, " ")}:
          <Text  ml={2} as="span" fontWeight="bold">
            {base_stat}
          </Text>
        </Text>
        <Progress value={base_stat} />
      </Box>
    ))}
  </Flex>
);

export default BaseStats;
