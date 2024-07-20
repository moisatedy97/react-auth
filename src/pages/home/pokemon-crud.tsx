import React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

import Loader from "@/components/loader";
import { axiosInstance } from "@/lib/axios-interceptor";
import { Pokemon } from "@/lib/interfaces";

import PokemonCard from "./components/pokemon-card";
import PokemonCreate from "./components/pokemon-create";
import { observer } from "mobx-react-lite";
import { authStore } from "@/store/auth-store";
import { ROLES } from "@/lib/constants";

function PokemonCrud(): React.JSX.Element {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Pokemon[]>("/pokemons");

      return data;
    },
    refetchOnWindowFocus: false
  });

  if (isError) {
    toast.error("Something went wrong fetching the pokemons. Please try again.");
  }

  if (isLoading) {
    return <Loader isGlobal={true} />;
  }

  return (
    <div className="m-6 grid grid-cols-1 gap-10 md:grid-cols-2 lg:m-10 lg:grid-cols-3">
      {data?.map((pokemon: Pokemon) => <PokemonCard key={`${pokemon.id}`} pokemon={pokemon} />)}
      {authStore.user?.role !== ROLES.USER && <PokemonCreate />}
    </div>
  );
}

export default observer(PokemonCrud);
