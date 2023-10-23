import { TypesRol } from 'src/common/glob/types';
export declare function Auth(...roles: TypesRol[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
