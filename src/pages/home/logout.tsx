import React from "react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

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
