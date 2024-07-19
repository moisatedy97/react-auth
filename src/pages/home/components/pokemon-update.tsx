import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { PencilIcon } from "lucide-react";
import { toast } from "sonner";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios-interceptor";
import { Pokemon } from "@/lib/interfaces";

function PokemonUpdate({ pokemon }: { pokemon: Pokemon }): React.JSX.Element {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (formData: Pokemon) => {
      const { data } = await axiosInstance.put<Pokemon>(`/pokemons/update/${formData.id}`, formData);

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["pokemons"], (oldData: Pokemon[] | undefined) => {
        if (oldData) {
          return oldData.map((pokemon) => {
            if (pokemon.id === data.id) {
              return data;
            }

            return pokemon;
          });
        }

        return [];
      });

      setOpen(false);
      toast.success(`Pokemon ${data.name} updated successfully!`);
    }
  });
  const form = useForm<Pokemon>({
    mode: "onChange",
    defaultValues: {
      id: pokemon.id,
      name: pokemon.name,
      type1: pokemon.type1,
      type2: pokemon.type2,
      image: pokemon.image,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      specialAttack: pokemon.specialAttack,
      specialDefense: pokemon.specialDefense,
      speed: pokemon.speed
    }
  });
  const [open, setOpen] = React.useState<boolean>(false);

  const onSubmit = (values: Pokemon) => {
    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={true}>
        <Button className="flex items-center gap-1" onClick={() => setOpen(true)}>
          <PencilIcon className="size-4" />
          <span>Update</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{`Edit ${pokemon.name}`}</DialogTitle>
          <DialogDescription>Make changes to your pokemon here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <PokemonType1 form={form} />
            <PokemonType2 form={form} />
            <PokemonImage form={form} />
            <div className="grid grid-cols-3 items-center gap-4">
              <PokemonHp form={form} />
              <PokemonAttack form={form} />
              <PokemonDefense form={form} />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <PokemonSpecialAttack form={form} />
              <PokemonSpecialDefense form={form} />
              <PokemonSpeed form={form} />
            </div>
            <Button type="submit" disabled={form.getValues("name").length === 0} className="mt-4">
              {isLoading ? <Loader /> : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default PokemonUpdate;

const PokemonType1 = ({ form }: { form: UseFormReturn<Pokemon> }): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name="type1"
      render={({ field }) => (
        <FormItem>
          <FormLabel>First type</FormLabel>
          <FormControl>
            <Input placeholder="Pokemon first type" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PokemonType2 = ({ form }: { form: UseFormReturn<Pokemon> }): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name="type2"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Second type</FormLabel>
          <FormControl>
            <Input placeholder="Pokemon second type" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PokemonImage = ({ form }: { form: UseFormReturn<Pokemon> }): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <Input placeholder="Pokemon image" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PokemonHp = ({ form }: { form: UseFormReturn<Pokemon> }): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name="hp"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Hp</FormLabel>
          <FormControl>
            <Input placeholder="Hp" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PokemonAttack = ({ form }: { form: UseFormReturn<Pokemon> }): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name="attack"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Attack</FormLabel>
          <FormControl>
            <Input placeholder="Attack" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PokemonDefense = ({ form }: { form: UseFormReturn<Pokemon> }): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name="defense"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Defense</FormLabel>
          <FormControl>
            <Input placeholder="Defense" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PokemonSpecialAttack = ({ form }: { form: UseFormReturn<Pokemon> }): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name="specialAttack"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Special attack</FormLabel>
          <FormControl>
            <Input placeholder="Special attack" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PokemonSpecialDefense = ({ form }: { form: UseFormReturn<Pokemon> }): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name="specialDefense"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Special defense</FormLabel>
          <FormControl>
            <Input placeholder="Special defense" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PokemonSpeed = ({ form }: { form: UseFormReturn<Pokemon> }): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name="speed"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Speed</FormLabel>
          <FormControl>
            <Input placeholder="Speed" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
