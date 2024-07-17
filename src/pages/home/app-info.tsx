import { InfoIcon } from "lucide-react";
import React from "react";

function AppInfo(): React.JSX.Element {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <Description />
      <Roles />
      <div>
        <p className="font-semibold">Below you can try out the authorization by interacting with the Pokemon CRUD.</p>
        <div className="flex items-center gap-2 font-semibold text-gray-500/60">
          <span>Note:</span>
          <span>
            As a user you can only "read" the existing Pokemons. Here's a MODERATOR account to try out the "create"
            action too.
          </span>
          <InfoIcon className="size-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default AppInfo;

const Description = (): React.JSX.Element => {
  return (
    <div>
      <p className="font-semibold">Welcome to my authentication server.</p>
      <p className="font-semibold">This is a showcase of how I implement authorization in a React application.</p>
      <p className="font-semibold">
        Many say that authentication and authorization is the hardest part of building a web application.
      </p>
      <p className="font-semibold">So I studied how to do it right especially in a React application.</p>
      <p className="font-semibold">
        You already witnessed the authentication part where you login with credentials and OTP code.
      </p>
      <p className="font-semibold">Now it's time for the authorization part.</p>
    </div>
  );
};

const Roles = (): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">As you noticed every user has a role. Those roles are:</p>
      <div className="grid grid-cols-2">
        <span className="font-semibold text-gray-500/60">ADMIN</span>
        <span className="font-bold">READ, CREATE, UPDATE, DELETE</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="font-semibold text-gray-500/60">MODERATOR</span>
        <span className="font-bold">READ, CREATE</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="font-semibold text-gray-500/60">USER</span>
        <span className="font-bold">READ</span>
      </div>
    </div>
  );
};
