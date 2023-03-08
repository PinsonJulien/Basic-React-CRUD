import { QueryParams, queryParamsToQueryString } from "../../helpers/queries/query.helper";
import { HttpMethod } from "../../types/http/http-method.enum";

export default class ApiService {
  
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';
  private readonly route;

  constructor(route?: string) {
    this.route = route ?? '';
  }

  /**
   * Performs a fetch request on the api using the given method, path and parameters.
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
    parameters: Object = {},
    body: Object = {},
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${this.route}/${path}`, {
      method,
      body: JSON.stringify(body),
    });

    return response.json();
  }

  /**
   * Performs a GET request against the api.
   * 
   * @param path Path
   * @param queryParams QueryParams
   * @returns Promise<any>
   */
  protected async get(path: Path, queryParams: QueryParams = {}): Promise<any> {
    path = path + queryParamsToQueryString(queryParams);

    return this.request(HttpMethod.GET, path);
  }

  /**
   * Performs a PUT request against the api.
   * 
   * @param path Path
   * @param parameters Object
   * @param body Object
   * @returns Promise<any>
   */
  protected async put(path: Path, parameters: Object = {}, body: Object = {}): Promise<any> {
    return this.request(HttpMethod.PUT, path, parameters, body);
  }

  /**
 * Performs a PATCH request against the api.
 * 
 * @param path Path
 * @param parameters Object
 * @param body Object
 * @returns Promise<any>
 */
  protected async patch(path: Path, parameters: Object = {}, body: Object = {}): Promise<any> {
    return this.request(HttpMethod.PATCH, path, parameters, body);
  }

/**
 * Performs a DELETE request against the api.
 * 
 * @param path Path
 * @param parameters Object
 * @returns Promise<any>
 */
  protected async delete(path: Path, parameters: Object = {}): Promise<any> {
    return this.request(HttpMethod.PUT, path, parameters);
  }

}

// Types
type Path = string|number;