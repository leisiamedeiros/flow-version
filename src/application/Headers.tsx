import { Session } from "./Session";
import Cookies from "js-cookie";

export interface HeadersAttributes {
    authorization: string;
}

export default class AppHeaders {

    static buildHeaders(headers: HeadersAttributes) {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': headers.authorization
        }
    }
}

