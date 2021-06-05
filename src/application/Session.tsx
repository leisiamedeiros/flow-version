export interface ISessionUser {
    username: string;
}

export default class SessionUser {

    static getUserSession(): ISessionUser | null {
        let user = sessionStorage.getItem("user");
        if (user == null) return null;

        return JSON.parse(user) as ISessionUser;
    }

    static registerUserSession(user: ISessionUser) {
        sessionStorage.setItem("user", JSON.stringify(user));
    }
}

export class Session {

    static set(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    static async get<T>(key: string) {
        let sessionResult = sessionStorage.getItem(key);

        if (sessionResult != null)
            return await JSON.parse(sessionResult) as T;
        else
            return null;
    }

    static getKeyString(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    static clear() {
        sessionStorage.clear();
        window.location.reload();
    }
}
