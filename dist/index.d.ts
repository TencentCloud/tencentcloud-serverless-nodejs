import * as services from './services';
interface InitConfig {
    secretId: any;
    secretKey: any;
    token?: any;
    region: any;
}
declare class SDK {
    config: any;
    requestHelper: any;
    init(config?: InitConfig): void;
    invoke: typeof services.invoke;
}
declare const _default: SDK;
export = _default;
