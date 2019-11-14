export declare const emptyOp: () => void;
export declare const clone: (obj: object) => object;
export declare const isType: (type: string) => (obj: any) => boolean;
export declare const caseFormat: (type: 'lower' | 'upper') => (string: string) => string;
export declare function caseForObject(obj: object, type: 'lower' | 'upper'): any;
export declare const getValue: (obj: object) => (key: string) => any;
export declare function uniteRes(fn: any, scope: any, args: any, returnKey: any): Promise<any>;
