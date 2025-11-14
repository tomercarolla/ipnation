export type IpResult = {
    country: string;
    flag: string;
    time: string;
}

export type Row = {
    id: string;
    value: string;
    result?: IpResult;
    error?: string;
}