/**
 * Auth helper functions
 */

/**
 * Validate and get JWT_SECRET from environment
 * @throws {Error} If JWT_SECRET is not properly configured
 */
export function getJWTSecret() {
  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!JWT_SECRET || JWT_SECRET === 'your-secret-key') {
    throw new Error('JWT_SECRET is not properly configured in environment variables');
  }
  
  return JWT_SECRET;
}
