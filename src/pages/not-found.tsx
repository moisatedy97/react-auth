import React from "react";

function NotFound(): React.JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404 Not Found</h1>
      <p className="text-secondary text-2xl font-semibold">Requested page not found.</p>
    </div>
  );
}

export default NotFound;
