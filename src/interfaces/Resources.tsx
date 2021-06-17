export interface ResourceResponse {
    total: number;
    items: string[];
}

export interface Resource {
    type: string;
    resource: string | object;
    resourceKey: string;
}