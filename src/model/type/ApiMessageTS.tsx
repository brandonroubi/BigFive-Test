export type ApiMessageTS = {
    data : any | undefined;
    type: string;
    status:number;
    summary: string;
    message: string | undefined ;
    closable: boolean;
    sticky: boolean ;
    duration: number ;
};
export const apiFailedMessageTSImp : ApiMessageTS = {
    data : undefined,
    type : 'error',
    status: 401,
    summary: ``,
    message: ``,
    closable: true,
    sticky: true,
    duration: 5000,
}
