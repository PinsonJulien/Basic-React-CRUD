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
   * @returns Promise<any>
   */
  private async request(
    method: HttpMethod, 
    path: Path,
    headers: Headers = {},
    body: Object = {},
  ): Promise<any> {
    // Combine the base headers with the custom ones.
    headers = {
      ...this.baseHeaders,
      ...headers,
    };

    const response = await fetch(`${this.baseUrl}/${this.route}/${path}`, {
      method,
      body: JSON.stringify(body),
      headers,
    });

    return response.json();
  }

  /**
   * Performs a GET request against the api.
   * 
   * @param path Path
   * @param queryParams QueryParams
   * @param headers Headers
   * @returns Promise<any>
   */
  protected async get(path: Path, queryParams: QueryParams = {}, headers: Headers = {}): Promise<any> {
    path = path + queryParamsToQueryString(queryParams);

    return this.request(HttpMethod.GET, path, headers);
  }

  /**
   * Performs a PUT request against the api.
   * 
   * @param path Path
   * @param headers Headers
   * @param body Object
   * @returns Promise<any>
   */
  protected async put(path: Path, headers: Headers = {}, body: Object = {}): Promise<any> {
    return this.request(HttpMethod.PUT, path, headers, body);
  }

  /**
 * Performs a PATCH request against the api.
 * 
 * @param path Path
 * @param headers Headers
 * @param body Object
 * @returns Promise<any>
 */
  protected async patch(path: Path, headers: Headers = {}, body: Object = {}): Promise<any> {
    return this.request(HttpMethod.PATCH, path, headers, body);
  }

/**
 * Performs a DELETE request against the api.
 * 
 * @param path Path
 * @param headers Headers
 * @returns Promise<any>
 */
  protected async delete(path: Path, headers: Headers = {}): Promise<any> {
    return this.request(HttpMethod.DELETE, path, headers);
  }

}

// Types
type Path = string|number;

interface Headers {
  [key: string]: string;
}