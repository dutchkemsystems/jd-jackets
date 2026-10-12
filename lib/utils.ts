import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * TODO_LINK: The destinations for these two links have not been confirmed
 * by the business owner. They are rendered as real anchors but currently
 * point to "#". Update once the catalogue and brief form URLs are known.
 */
export const CUSTOMIZATION_CATALOGUE_URL = "#";
export const FULL_BRIEF_URL = "#";
