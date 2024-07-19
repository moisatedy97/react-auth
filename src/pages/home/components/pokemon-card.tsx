import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pokemon } from "@/lib/interfaces";

function PokemonCard({ pokemon }: { pokemon: Pokemon }): React.JSX.Element {
  return (
    <Card className="max-w-72">
      <CardHeader className="p-4">
        <div className="flex justify-between">
          <CardTitle className="font-bold">{pokemon.name}</CardTitle>
          <div className="space-x-2">
            <span className="text-xs font-semibold">HP</span>
            <span className="text-xl font-bold text-green-600">{pokemon.hp}</span>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <img src={pokemon.image} alt={`${pokemon.name} image`} className="size-36" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <PokemonType pokemon={pokemon} />
        <PokemonAbilities pokemon={pokemon} />
        <PokemonStats pokemon={pokemon} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}

export default PokemonCard;

const PokemonType = ({ pokemon }: { pokemon: Pokemon }): React.JSX.Element => {
  return (
    <div className="flex w-full justify-end">
      <div className="flex gap-2">
        <span className="font-semibold italic">{pokemon.type1}</span>
        <span className="font-semibold italic">{pokemon.type2}</span>
      </div>
    </div>
  );
};

const PokemonAbilities = ({ pokemon }: { pokemon: Pokemon }): React.JSX.Element => {
  return (
    <div className="space-x-2">
      <span className="text-xs font-semibold italic">Abilities</span>
      <span className="font-bold">{pokemon.abilities}</span>
    </div>
  );
};

const PokemonStats = ({ pokemon }: { pokemon: Pokemon }): React.JSX.Element => {
  return (
    <div className="my-4 grid grid-cols-2 items-center justify-items-start gap-2">
      <span className="text-xs font-semibold italic">Attack</span>
      <span className="text-lg font-bold text-red-500">{pokemon.attack}</span>
      <span className="text-xs font-semibold italic">Defense</span>
      <span className="text-lg font-bold text-green-500">{pokemon.defense}</span>
      <span className="text-xs font-semibold italic">Special Attack</span>
      <span className="text-lg font-bold text-red-500">{pokemon.specialAttack}</span>
      <span className="text-xs font-semibold italic">Special Defense</span>
      <span className="text-lg font-bold text-green-500">{pokemon.specialDefense}</span>
      <span className="text-xs font-semibold italic">Speed</span>
      <span className="text-lg font-bold text-orange-500">{pokemon.speed}</span>
    </div>
  );
};
