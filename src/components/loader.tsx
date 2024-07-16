import React from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

function Loader({ isGlobal = false, className }: { isGlobal?: boolean; className?: string }): React.JSX.Element {
  if (isGlobal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <LoaderCircle className="size-24 animate-spin text-black dark:text-white" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle className={cn("animate-spin", className)} />
    </div>
  );
}

export default Loader;
