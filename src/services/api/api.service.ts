import { HttpMethod } from "../../types/http/http-method.enum";

export default class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  private route;

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
    path: string|number,
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
   * Performs a get request against the api.
   * 
   * @param path string|number
   * @param parameters Object
   * @returns Promise<any>
   */
  protected async get(path: string|number, parameters: Object = {}): Promise<any> {
    return this.request(HttpMethod.GET, path, parameters);
  }
}