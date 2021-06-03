
export interface HeadersAttributes {
    authorization: string;
}

export default class AppHeaders {

    static buildBlipHeaders(headers: HeadersAttributes) {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': headers.authorization
        }
    }
}

