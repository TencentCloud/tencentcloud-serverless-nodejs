import * as services from './services';
import { InitConfig, ExtraParams } from './helper/types';
declare class SDK {
    config: InitConfig;
    requestHelper: any;
    extraParams: ExtraParams;
    init(config?: InitConfig, extraParams?: ExtraParams): void;
    _reset(): void;
    invoke: typeof services.invoke;
}
declare const _default: SDK;
export = _default;
