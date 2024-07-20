import React from "react";
import { UseFormReturn } from "react-hook-form";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";
import { z } from "zod";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { axiosInstance } from "@/lib/axios-interceptor";
import { LoginResponse } from "@/lib/interfaces";
import { authStore } from "@/store/auth-store";

import logo from "../../assets/logo.svg";
import { formSchema } from "../login";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

function OtpForm({
  form,
  setShowOtpForm
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  setShowOtpForm: React.Dispatch<React.SetStateAction<boolean>>;
}): React.JSX.Element {
  const navigation = useNavigate();
  const [value, setValue] = React.useState("");
  const mutation = useMutation({
    mutationFn: async (formData: z.infer<typeof formSchema>) => {
      const response = await axiosInstance.get<LoginResponse>("/auth/login", {
        params: {
          email: formData.email,
          otp: value
        }
      });

      return response;
    },
    onSuccess: (response) => {
      const { data } = response;

      setShowOtpForm(false);
      navigation(ROUTES.HOME);
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

  return (
    <div className="flex items-center justify-center py-3 lg:py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-center">
            <h1 className="text-3xl font-bold">Check OTP</h1>
            <img src={logo} alt="logo" className="size-12" />
          </div>
          <p className="text-muted-foreground text-balance">Check your email for the OTP code</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <TimerLoader setShowOtpForm={setShowOtpForm} />
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
        </div>
      </div>
    </div>
  );
}

export default OtpForm;

const TimerLoader = ({
  setShowOtpForm
}: {
  setShowOtpForm: React.Dispatch<React.SetStateAction<boolean>>;
}): React.JSX.Element => {
  const [timer, setTimer] = React.useState<number>(60);

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
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <Loader className="size-24" />
      <div className="absolute font-semibold">{timer}</div>
    </div>
  );
};
