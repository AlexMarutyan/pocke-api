import { isEmpty } from "lodash";
import { Text, Center, AbsoluteCenterProps } from "@chakra-ui/react";

export type EmptyStateProps = AbsoluteCenterProps & {
  heading?: string;
  description?: string;
};

const EmptyState = ({
  description,
  heading = "No data found",
  ...rest
}: EmptyStateProps) => (
  <Center flexDir="column" textAlign="center" {...rest}>
    <Text fontSize="xl" fontWeight="bold">
      {heading}
    </Text>
    {!isEmpty(description) && (
      <Text pt={1} maxW="2xl" opacity={0.6} fontWeight="normal">
        {description}
      </Text>
    )}
  </Center>
);

export default EmptyState;
