import LocalStorageService from "./local-storage.service";

// Exposed class
class LocalStorageServiceTest extends LocalStorageService {
  public setItemMocked<T>(value: T): void {
    this.setItem(value);
  }

  public getItemMocked<T>(): T | null {
    return this.getItem();
  }

  public removeItemMocked(): void {
    this.removeItem();
  }
}

describe('LocalStorageService', () => {
  const key = 'testKey';
  const localStorageService = new LocalStorageServiceTest(key);

  afterEach(() => {
    localStorage.removeItem(key);
  });

  describe('setItem', () => {
    it('should set an item in localStorage', () => {
      const value = { testValue: 'hello' };

      localStorageService.setItemMocked(value);

      const storedValue = JSON.parse(localStorage.getItem(key) || '');

      expect(storedValue).toEqual(value);
    });
  });

  describe('getItem', () => {
    it('should get an item from localStorage', () => {
      const value = { testValue: 'hello' };
      localStorage.setItem(key, JSON.stringify(value));

      const storedValue = localStorageService.getItemMocked();

      expect(storedValue).toEqual(value);
    });

    it('should return null if the item is not found in localStorage', () => {
      const storedValue = localStorageService.getItemMocked();

      expect(storedValue).toBeNull();
    });
  });

  describe('removeItem', () => {
    it('should remove an item from localStorage', () => {
      const value = { testValue: 'hello' };
      localStorage.setItem(key, JSON.stringify(value));

      localStorageService.removeItemMocked();

      const storedValue = localStorage.getItem(key);

      expect(storedValue).toBeNull();
    });
  });
});