/**
 * Capitalize the first letter of the given string.
 * 
 * @param str string
 * @returns string
 */
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}