import { queryParamsToQueryString } from "./query.helper";

describe('objectToQueryString', () => {
  it('should return an empty string when the given object has no properties.', () => {
    const obj = {};
    const queryString = queryParamsToQueryString(obj);
    
    expect(queryString).toEqual('');
  });

  it('should convert an object to a query string', () => {
    const obj = { userId: 1, test: 'test' };
    const queryString = queryParamsToQueryString(obj);
    expect(queryString).toEqual('?userId=1&test=test');
  });
});