import React from "react";
import { InfoIcon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function AppInfo(): React.JSX.Element {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <Description />
      <Roles />
      <div>
        <p className="text-sm font-semibold lg:text-base">
          Below you can try out the authorization by interacting with the Pokemon CRUD.
        </p>
        <div className="mt-2 flex items-center gap-2 font-semibold text-gray-500/60">
          <span className="text-xs font-semibold lg:text-sm">
            Note: As a user you can only "read" the existing Pokemons. Here's a MODERATOR account to try out the
            "create" action too.
          </span>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="size-4 cursor-pointer lg:size-6" />
            </TooltipTrigger>
            <TooltipContent className="flex flex-col gap-1">
              <span>username: admin@admin.com</span>
              <span>password: admin</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default AppInfo;

const Description = (): React.JSX.Element => {
  return (
    <div>
      <p className="text-sm font-semibold lg:text-base">
        Welcome to my authentication server. This is a showcase of how I implement authorization in a React application.
        Many say that authentication and authorization is the hardest part of building a web application. So I studied
        how to do it right especially in a React application. how to do it right especially in a React application. Now
        it's time for the authorization part.
      </p>
    </div>
  );
};

const Roles = (): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold lg:text-base">As you noticed every user has a role. Those roles are:</p>
      <div className="grid w-full grid-cols-2 justify-items-start gap-2 lg:w-max">
        <span className="text-sm font-semibold text-gray-500/60 lg:text-base">ADMIN</span>
        <span className="text-sm font-bold lg:text-base">READ, CREATE, UPDATE, DELETE</span>
        <span className="text-sm font-semibold text-gray-500/60 lg:text-base">MODERATOR</span>
        <span className="text-sm font-bold lg:text-base">READ, CREATE</span>
        <span className="text-sm font-semibold text-gray-500/60 lg:text-base">USER</span>
        <span className="text-sm font-bold lg:text-base">READ</span>
      </div>
    </div>
  );
};
