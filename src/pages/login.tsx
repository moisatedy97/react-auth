import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import LoginForm from "./login/login-form";
import OtpForm from "./login/otp-form";

export const formSchema = z.object({
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
