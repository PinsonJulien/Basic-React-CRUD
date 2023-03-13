import { capitalizeFirst } from "./string.helper";

describe('string helpers', () => {

  describe('capitalizeFirst', () => {
    it('capitalize the first letter of the provided string.', () => {
      const string = capitalizeFirst('test');
      expect(string).toEqual('Test');
    });
  });

});