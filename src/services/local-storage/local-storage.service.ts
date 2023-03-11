export default class LocalStorageService {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  /**
   * Set the value of the key in the localStorage.
   * 
   * @param value T
   * @returns void
   */
  protected setItem<T>(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  /**
   * Get the value of the key in the localStorage.
   * 
   * @returns T | null
   */
  protected getItem<T>(): T | null {
    const value = localStorage.getItem(this.key);

    return (value)
      ? JSON.parse(value)
      : null;
  }

  /**
   * Remove the value of the key in the localStorage.
   * 
   * @returns void
   */
  protected removeItem(): void {
    localStorage.removeItem(this.key);
  }
}