import {includes, isEmpty} from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Text, Flex, Image, Skeleton } from "@chakra-ui/react";

import { fetchPokemon } from "../../services/pokemons";
import {useAppSelector} from "../../store/hooks";

type CardItemProps = {
  name: string;
};

const CardItem = ({ name }: CardItemProps) => {
  const types  = useAppSelector((state) => state.filters.types);

  const { data } = useQuery([`fetchPokemon_${name}`], () => fetchPokemon(name));

  return !isEmpty(data) && (isEmpty(types) || includes(types,data?.types[0].type.name)) ? (
    <Flex
      p={2}
      gap={4}
      w="full"
      flexWrap="wrap"
      overflow="hidden"
      borderRadius="3xl"
      maxW={{ base: "45%", lg: "30%" }}
      bg={`pokemon.${data?.types[0].type.name}`}
    >
      <Image

        boxSize={24}
        objectFit="contain"
        alt="Pokemon image"
        src={data?.sprites?.other.dream_world.front_default}
        fallback={<Skeleton borderRadius="full" boxSize={24}/>}
      />
      <Text
        px={4}
        py={2}
        flex={1}
        display="flex"
        flexDir="column"
        color="gray.400"
        fontWeight="bold"
        alignItems="flex-end"
        justifySelf="flex-end"
        justifyContent="space-between"
      >
        # {data?.id}
        <Text as="span" textTransform="capitalize">{data?.name.replace(/-/g, " ")}</Text>
      </Text>
    </Flex>
  ) : null;
};

export default CardItem;
