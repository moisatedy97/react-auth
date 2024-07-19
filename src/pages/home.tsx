import React from "react";
import { observer } from "mobx-react-lite";

import { cn, getStatusColor } from "@/lib/utils";
import { authStore } from "@/store/auth-store";

import AppInfo from "./home/app-info";
import Logout from "./home/logout";
import PokemonCrud from "./home/pokemon-crud";

function Home(): React.JSX.Element {
  const { user } = authStore;

  if (user) {
    return (
      <div className="w-full overflow-auto p-10">
        <div className="flex items-center">
          <div className={cn("mr-4 h-4 w-4 rounded-full", getStatusColor(user.status))} />
          <h1>
            <span className="text-4xl font-bold italic">Welcome, </span>
            <span className="text-4xl font-bold">{user.firstName ? user.firstName : user.email}</span>
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
