export interface PublishedFlowResponse {
    resource: string;
    to: string;
    id: string;
}

export interface BackupFlow {
    botName: string;
    version: string;
    flow: object;
}