import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import rpaLight from "@/assets/rpa-light.png";

import LoginForm from "./login/login-form";
import OtpForm from "./login/otp-form";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" })
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
    <div className="h-full overflow-auto lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center">
        <img src={rpaLight} alt="react-perfect-authentication" className="scale-90 rounded-lg" />
      </div>
      <div className="flex items-center justify-center">
        {showOtpForm ? (
          <OtpForm form={form} setShowOtpForm={setShowOtpForm} />
        ) : (
          <LoginForm form={form} setShowOtpForm={setShowOtpForm} />
        )}
      </div>
    </div>
  );
}

export default Login;
