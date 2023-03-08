import { objectToQueryString } from "./query-string.helper";

describe('objectToQueryString', () => {
  it('should return an empty string when the given object has no properties.', () => {
    const obj = {};
    const queryString = objectToQueryString(obj);
    
    expect(queryString).toEqual('');
  });

  it('should convert an object to a query string', () => {
    const obj = { userId: 1, test: 'test' };
    const queryString = objectToQueryString(obj);
    expect(queryString).toEqual('?userId=1&test=test');
  });
});