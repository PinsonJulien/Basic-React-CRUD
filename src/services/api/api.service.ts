import { QueryParams, queryParamsToQueryString } from "../../helpers/queries/query.helper";
import { HttpMethod } from "../../types/http/http-method.enum";

export default class ApiService {

  private readonly baseUrl: string = 'https://jsonplaceholder.typicode.com';
  private readonly route: string;

  private readonly baseHeaders: Headers = {
    'Content-Type': 'application/json',
  };

  constructor(route?: string) {
    this.route = route ?? '';
  }

  /**
   * Performs a fetch request on the api using the given method and path.
   * Additional headers can be provided, base headers can be overwritten.
   * Also accepts a body for POST / PUT / PATCH requests.
   * 
   * @param method HttpMethod
   * @param path string|number
   * @param parameters Object
   * @param body Object
   * @returns Promise<T>
   */
  private async request<T>(
    method: HttpMethod, 
    path: Path,
    headers: Headers = {},
    body: Object = {},
  ): Promise<T> {
    // Combine the base headers with the custom ones.
    headers = {
      ...this.baseHeaders,
      ...headers,
    };

    const requestInit: RequestInit = { method, headers, };

    // Add the body on POST / PUT / PATCH
    if (method === HttpMethod.POST || method === HttpMethod.PUT || method === HttpMethod.PATCH)
      requestInit.body = JSON.stringify(body)

    const response = await fetch(`${this.baseUrl}/${this.route}/${path}`, requestInit);

    return response.json();
  }

  /**
   * Performs a GET request against the api using the given path, query parameters and headers.
   * 
   * @param path Path
   * @param queryParams QueryParams
   * @param headers Headers
   * @returns Promise<T>
   */
  protected async get<T>(path: Path, queryParams: QueryParams = {}, headers: Headers = {}): Promise<T> {
    path = path + queryParamsToQueryString(queryParams);

    return this.request<T>(HttpMethod.GET, path, headers);
  }

  /**
   * Performs a POST request against the api using the given path, headers and body.
   * 
   * @param path Path
   * @param headers Headers
   * @param body Object
   * @returns Promise<T>
   */
  protected async post<T>(path: Path, headers: Headers = {}, body: Object = {}): Promise<T> {
    return this.request<T>(HttpMethod.POST, path, headers, body);
  }

  /**
   * Performs a PUT request against the api using the given path, headers and body.
   * 
   * @param path Path
   * @param headers Headers
   * @param body Object
   * @returns Promise<T>
   */
  protected async put<T>(path: Path, headers: Headers = {}, body: Object = {}): Promise<T> {
    return this.request<T>(HttpMethod.PUT, path, headers, body);
  }

  /**
 * Performs a PATCH request against the api using the given path, headers and body.
 * 
 * @param path Path
 * @param headers Headers
 * @param body Object
 * @returns Promise<T>
 */
  protected async patch<T>(path: Path, headers: Headers = {}, body: Object = {}): Promise<T> {
    return this.request<T>(HttpMethod.PATCH, path, headers, body);
  }

/**
 * Performs a DELETE request against the api using the given path and headers.
 * 
 * @param path Path
 * @param headers Headers
 * @returns Promise<T>
 */
  protected async delete<T>(path: Path, headers: Headers = {}): Promise<T> {
    return this.request<T>(HttpMethod.DELETE, path, headers);
  }

}

// Types
type Path = string|number;

interface Headers {
  [key: string]: string;
}