/** https://www.typescriptlang.org/docs/handbook/utility-types.html
 * Partial Readonly Required Pick Omit Exclude Extract NonNullable Required Record
 * Parameters ReturnType InstanceType ConstructorParameters
 * ThisType ThisParameterType OmitThisParameter
 * */
export declare type ValueOf<T> = T[keyof T];
export declare type Modify<T, R> = Omit<T, keyof R> & R;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
