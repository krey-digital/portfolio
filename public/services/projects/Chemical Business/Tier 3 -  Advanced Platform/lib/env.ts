/**
 * Environment variable validation helper
 * Validates required environment variables at build time
 */

export interface EnvironmentVariables {
  // Convex
  NEXT_PUBLIC_CONVEX_URL: string; // Required - Convex deployment URL
  RESEND_API_KEY?: string; // Optional for dev - email service (Convex action only)
  ADMIN_EMAIL?: string; // Optional - admin email for initial setup
  
  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID?: string; // Optional - GA tracking
  
  // Contact & Nav
  NEXT_PUBLIC_FORMSPREE_ID: string; // Required - contact form
  NEXT_PUBLIC_WHATSAPP_NUMBER: string; // Required - WhatsApp CTA
  NEXT_PUBLIC_MAPS_EMBED_URL: string; // Required - Google Maps embed
}

/**
 * Get an environment variable with runtime validation
 * Throws an error if a required variable is missing
 * 
 * @param key - The environment variable key
 * @returns The environment variable value
 * @throws Error if required variable is missing
 */
export function getEnvVar(key: keyof EnvironmentVariables): string {
  const value = process.env[key];
  
  // GA_MEASUREMENT_ID is optional, all others are required
  if (!value && key !== "NEXT_PUBLIC_GA_MEASUREMENT_ID") {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value || "";
}

/**
 * Validate all required environment variables at build time
 * Call this in next.config.ts or at app initialization
 * 
 * @throws Error if any required variables are missing
 */
export function validateEnv(): void {
  const required: (keyof EnvironmentVariables)[] = [
    "NEXT_PUBLIC_CONVEX_URL",
    "NEXT_PUBLIC_FORMSPREE_ID",
    "NEXT_PUBLIC_WHATSAPP_NUMBER",
    "NEXT_PUBLIC_MAPS_EMBED_URL",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
