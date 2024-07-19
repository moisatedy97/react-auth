import React from "react";
import { useMutation } from "react-query";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios-interceptor";
import { authStore } from "@/store/auth-store";

function Logout(): React.JSX.Element {
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get("/auth/logout");

      return response;
    },
    onSuccess: (response) => {
      if (response.status === 202) {
        authStore.logoutUser();

        toast.success("Successfully logged out!");
      }
    }
  });

  return (
    <Button className="ml-10" variant="outline" size="icon" onClick={() => mutate()}>
      {isLoading ? <Loader /> : <LogOut />}
    </Button>
  );
}

export default Logout;
