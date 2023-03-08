export function objectToQueryString(obj: { [key: string]: string|number }): string {
  const keys = Object.keys(obj);
  if (!keys.length)
    return '';
  
  const queryParams = keys.map((key: string) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
  }).join('&');

  return `?${queryParams}`;
}