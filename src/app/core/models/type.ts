export interface Type<T> extends Function {
  new(...args: unknown[]): T;
}
