import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRoleColor(role: string): string {
  switch (role) {
    case "ADMIN":
      return "bg-red-500";
    case "MODERATOR":
      return "bg-yellow-500";
    case "USER":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "ACTIVE":
      return "bg-green-500";
    case "INACTIVE":
      return "bg-yellow-500";
    case "SUSPENDED":
      return "bg-red-500";
    case "DELETED":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
}
