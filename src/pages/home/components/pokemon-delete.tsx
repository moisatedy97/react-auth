import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import Loader from "@/components/loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios-interceptor";
import { Pokemon } from "@/lib/interfaces";

function PokemonDelete({ pokemon }: { pokemon: Pokemon }): React.JSX.Element {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (pokemonId: number) => {
      await axiosInstance.delete(`/pokemons/delete/${pokemonId}`);
    },
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["pokemons"], (oldData: Pokemon[] | undefined) => {
        if (oldData) {
          return oldData.filter((pokemon) => pokemon.id !== variables);
        }

        return [];
      });

      toast.success(`Pokemon ${pokemon.name} deleted successfully!`);
    }
  });

  const handleDelete = () => {
    mutate(pokemon.id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={true}>
        <Button className="flex items-center gap-1" variant="outline">
          <TrashIcon className="size-4" />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {pokemon.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {pokemon.name} from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>{isLoading ? <Loader /> : "Delete"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PokemonDelete;
