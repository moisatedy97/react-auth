import React from "react";
import { observer } from "mobx-react-lite";

import { cn, getStatusColor } from "@/lib/utils";
import { authStore } from "@/store/auth-store";

import AppInfo from "./home/app-info";
import Logout from "./home/logout";
import PokemonCrud from "./home/pokemon-crud";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function Home(): React.JSX.Element {
  const { user } = authStore;

  if (user) {
    return (
      <div className="w-full overflow-auto p-4 lg:p-10">
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger>
              <div className={cn("mr-4 size-2 rounded-full lg:size-4", getStatusColor(user.status))} />
            </TooltipTrigger>
            <TooltipContent className={cn("font-bold")}>{user.status}</TooltipContent>
          </Tooltip>
          <h1>
            <span className="text-3xl font-bold italic lg:text-4xl">Welcome, </span>
            <span className="text-3xl font-bold lg:text-4xl">{user.firstName ? user.firstName : user.email}</span>
          </h1>
          <Logout />
        </div>
        <div className="flex items-center gap-2 px-9">
          <span className="font-semibold text-gray-500/60">Role</span>
          <span className="font-bold text-red-600">{user.role}</span>
        </div>
        <AppInfo />
        <PokemonCrud />
      </div>
    );
  } else {
    return <h1>User not found</h1>;
  }
}

export default observer(Home);
