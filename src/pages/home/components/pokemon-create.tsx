import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { PlusIcon } from "lucide-react";
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

function PokemonCreate(): React.JSX.Element {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (formData: Omit<Pokemon, "id">) => {
      const { data } = await axiosInstance.post<Pokemon>("/pokemons/create", formData);

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["pokemons"], (oldData: Pokemon[] | undefined) => {
        if (oldData) {
          return [...oldData, data];
        }

        return [];
      });

      setOpen(false);
      toast.success(`Pokemon ${data.name} created successfully!`);
    }
  });
  const form = useForm<Omit<Pokemon, "id">>({
    mode: "onChange",
    defaultValues: {
      name: "",
      type1: "",
      type2: "",
      image: "",
      hp: 0,
      attack: "",
      defense: "",
      specialAttack: "",
      specialDefense: "",
      speed: ""
    }
  });
  const [open, setOpen] = React.useState<boolean>(false);

  const onSubmit = (values: Omit<Pokemon, "id">) => {
    mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={true}>
        <Button variant="outline" className="h-40 w-56 self-center" onClick={() => setOpen(true)}>
          <PlusIcon className="size-10" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create new pokemon</DialogTitle>
          <DialogDescription>Create your desired pokemon here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <PokemonName form={form} />
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

export default PokemonCreate;

const PokemonName = ({ form }: { form: UseFormReturn<Omit<Pokemon, "id">> }): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Pokemon name" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PokemonType1 = ({ form }: { form: UseFormReturn<Omit<Pokemon, "id">> }): React.JSX.Element => {
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

const PokemonType2 = ({ form }: { form: UseFormReturn<Omit<Pokemon, "id">> }): React.JSX.Element => {
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

const PokemonImage = ({ form }: { form: UseFormReturn<Omit<Pokemon, "id">> }): React.JSX.Element => {
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

const PokemonHp = ({ form }: { form: UseFormReturn<Omit<Pokemon, "id">> }): React.JSX.Element => {
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

const PokemonAttack = ({ form }: { form: UseFormReturn<Omit<Pokemon, "id">> }): React.JSX.Element => {
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

const PokemonDefense = ({ form }: { form: UseFormReturn<Omit<Pokemon, "id">> }): React.JSX.Element => {
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

const PokemonSpecialAttack = ({ form }: { form: UseFormReturn<Omit<Pokemon, "id">> }): React.JSX.Element => {
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

const PokemonSpecialDefense = ({ form }: { form: UseFormReturn<Omit<Pokemon, "id">> }): React.JSX.Element => {
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

const PokemonSpeed = ({ form }: { form: UseFormReturn<Omit<Pokemon, "id">> }): React.JSX.Element => {
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
