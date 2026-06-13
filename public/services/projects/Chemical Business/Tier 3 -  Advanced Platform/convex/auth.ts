// Auth configuration for Convex
// Currently using localStorage + demo credentials for MVP
// TODO: Integrate full Convex Auth in production

export const ADMIN_CREDENTIALS = {
  email: "admin@chemcorp.com",
  password: "admin123",
};

export function verifyAdminPassword(
  email: string,
  password: string
): boolean {
  return (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  );
}
