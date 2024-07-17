import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";

function Logout(): React.JSX.Element {
  const handleClick = () => {
    // authStore.logoutUser();
    console.log("logout");
  };

  return (
    <Button className="ml-10" variant="outline" size="icon" onClick={handleClick}>
      <LogOut />
    </Button>
  );
}

export default Logout;
