// Remove any HTML tags and special characters
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove HTML tags
  const stripped = input.replace(/<[^>]*>/g, '');
  
  // Remove potentially dangerous characters
  const sanitized = stripped
    .replace(/[<>]/g, '') // Remove remaining angle brackets
    .replace(/[&<>"']/g, '') // Remove HTML entities
    .replace(/[^\w\s-]/g, '') // Remove special characters, keep alphanumeric, spaces, and hyphens
    .trim();
  
  return sanitized;
}

// Validate API name against allowed values
export function sanitizeApiName(api: string): string | null {
  const allowedApis = ['wikipedia', 'giphy', 'news', 'youtube'];
  return allowedApis.includes(api) ? api : null;
}

// Validate and sanitize offset parameter
export function sanitizeOffset(offset: string): number {
  const parsed = parseInt(offset, 10);
  return isNaN(parsed) || parsed < 0 ? 0 : parsed;
} 