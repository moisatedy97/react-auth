import React from "react";
import { useQuery } from "react-query";

import { axiosInstance } from "@/lib/axios-interceptor";
import { Pokemon } from "@/lib/interfaces";

import PokemonCard from "./components/pokemon-card";

function PokemonCrud(): React.JSX.Element {
  const { data } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Pokemon[]>("/pokemons");

      return data;
    }
  });

  return (
    <div className="m-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((pokemon: Pokemon) => <PokemonCard key={`${pokemon.id}`} pokemon={pokemon} />)}
    </div>
  );
}

export default PokemonCrud;
