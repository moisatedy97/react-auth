import { UseFormReturn } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios-interceptor";
import { LoginResponse } from "@/lib/interfaces";

import { formSchema } from "../login";

function LoginForm({
  form,
  setShowOtpForm
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  setShowOtpForm: React.Dispatch<React.SetStateAction<boolean>>;
}): React.JSX.Element {
  const mutation = useMutation({
    mutationFn: async (formData: z.infer<typeof formSchema>) => {
      const { data } = await axiosInstance.get<LoginResponse>("/auth/login", {
        params: {
          email: formData.email,
          password: formData.password
        }
      });

      return data;
    },
    onSuccess: () => {
      setShowOtpForm(true);
    },
    onError: (error: AxiosError) => {
      toast.error(
        <div className="flex flex-col items-start justify-center gap-1">
          {error.response && <h4 className="text-sm font-bold">{`${error.response.status} Unauthorized`}</h4>}
          <p className="text-xs font-semibold">Sorry! Your credentials are incorrect. Please try login again.</p>
        </div>
      );
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="flex items-center justify-center py-3 lg:py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground text-balance">Enter your email below to login to your account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} required={true} />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your password" {...field} />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {mutation.isLoading ? <Loader /> : "Submit"}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="#" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
