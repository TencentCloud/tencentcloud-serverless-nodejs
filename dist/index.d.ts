import * as services from './services';
import { InitConfig } from './helper/types';
declare class SDK {
    config: InitConfig;
    requestHelper: any;
    init(config?: InitConfig): void;
    _reset(): void;
    invoke: typeof services.invoke;
}
declare const _default: SDK;
export = _default;
