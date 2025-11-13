export type IpResult = {
    flag: string;
    hour: string;
}

export type Row = {
    id: string;
    value: string;
    result?: IpResult;
    error?: string;
}