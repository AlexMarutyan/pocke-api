import client from "./client";
import { QueryFunctionContext } from "@tanstack/react-query";
import { isEmpty } from "lodash";

export const fetchPokemons = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<any>) => {
  let response;
  if (isEmpty(pageParam)) {
    response = await client.get("/pokemon", { params: { ...queryKey[1] } });
  } else {
    let url = pageParam.slice(pageParam.indexOf("?"), pageParam?.length);
    response = await client.get(`/pokemon/${url}`);
  }
  return response.data;
};

export const fetchPokemonsInCardView = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<any>) => {
  console.log(queryKey, pageParam);
  const response = await client.get(`/pokemon`);
  return response.data;
};

export const fetchPokemon = async (pokemonId: string) => {
  const response = await client.get(`/pokemon/${pokemonId}`);
  return response.data;
};

export const fetchEvolutionChain = async (pokemonId: string) => {
  const response = await client.get(`/evolution-chain/${pokemonId}`);
  return response.data;
};
