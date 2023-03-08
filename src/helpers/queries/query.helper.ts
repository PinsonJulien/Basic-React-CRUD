// Types
export interface QueryParams {
  [key: string]: string|number
};

export function queryParamsToQueryString(obj: QueryParams): string {
  const keys = Object.keys(obj);
  if (!keys.length)
    return '';
  
  const queryParams = keys.map((key: string) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
  }).join('&');

  return `?${queryParams}`;
}