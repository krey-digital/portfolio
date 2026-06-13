import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for conditionally joining Tailwind CSS class names
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts
 * 
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", "hover:bg-blue-600")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
