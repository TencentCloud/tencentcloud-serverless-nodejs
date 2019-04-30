import { APIV3Res, APIV3Error } from '../helper/types';
interface Params {
    functionName: string;
    qualifier?: string;
    clientContext?: string;
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
export default function (params: Params): Promise<Res>;
export {};
