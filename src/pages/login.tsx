import React, { memo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";
import { z } from "zod";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { axiosInstance } from "@/lib/axios-interceptor";
import { LoginResponse } from "@/lib/interfaces";
import { authStore } from "@/store/auth-store";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

function Login(): React.JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const [showOtpForm, setShowOtpForm] = React.useState<boolean>(false);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {showOtpForm ? (
        <OtpForm form={form} setShowOtpForm={setShowOtpForm} />
      ) : (
        <LoginForm form={form} setShowOtpForm={setShowOtpForm} />
      )}
    </div>
  );
}

export default Login;

const LoginForm = ({
  form,
  setShowOtpForm
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  setShowOtpForm: React.Dispatch<React.SetStateAction<boolean>>;
}): React.JSX.Element => {
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
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent className="w-[28rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
      </CardContent>
    </Card>
  );
};

const OtpForm = memo(
  ({
    form,
    setShowOtpForm
  }: {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    setShowOtpForm: React.Dispatch<React.SetStateAction<boolean>>;
  }): React.JSX.Element => {
    const [timer, setTimer] = React.useState<number>(5);
    const [value, setValue] = React.useState("");
    const mutation = useMutation({
      mutationFn: async (formData: z.infer<typeof formSchema>) => {
        const { data } = await axiosInstance.get<LoginResponse>("/auth/login", {
          params: {
            email: formData.email,
            otp: value
          }
        });

        return data;
      },
      onSuccess: (data) => {
        setShowOtpForm(false);
        authStore.authenticateUser(data.user, data.token);

        toast.success("Successfully logged in!");
      },
      onError: (error: AxiosError) => {
        setShowOtpForm(false);

        toast.error(
          <div className="flex flex-col items-start justify-center gap-1">
            {error.response && <h4 className="text-sm font-bold">{`${error.response.status} Unauthorized`}</h4>}
            <p className="text-xs font-semibold">Sorry! Your OTP code is incorrect. Please try login again.</p>
          </div>
        );
      }
    });

    const handleSubmit = () => {
      mutation.mutate(form.getValues());
    };

    React.useEffect(() => {
      if (value.length === 4) {
        handleSubmit();
      }
    }, [value]);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setShowOtpForm(false);
            toast.error("Sorry! Your time is up. Please try to login again.");
          }

          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div>
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Check OTP</CardTitle>
            <CardDescription>Check your email for the OTP code</CardDescription>
          </CardHeader>
          <CardContent className="flex w-[28rem] flex-col items-center justify-center gap-6">
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              <Loader className="size-24" />
              <div className="absolute font-semibold">{timer}</div>
            </div>
            <InputOTP
              value={value}
              onChange={(value) => setValue(value)}
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              autoFocus={true}
            >
              <InputOTPGroup className="w-full">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {mutation.isLoading ? <Loader /> : "Submit"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
);
