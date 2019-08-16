import { APIV3Res, APIV3Error, InitConfig } from '../helper/types';
interface Params {
    functionName: string;
    qualifier?: string;
    data?: string;
    namespace?: string;
}
declare type Res = APIV3Res<{
    Result: {
        MemUsage: number;
        FunctionRequestId: string;
        RetMsg: string;
        Duration: number;
        ErrMsg: string;
        BillDuration: number;
        InvokeResult: number;
        Log: string;
    };
}> & APIV3Error;
export default function (params: Params & InitConfig): Promise<Res>;
export {};
