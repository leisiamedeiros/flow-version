
export default class Auth {

    static isAuthenticated(): boolean {
        return sessionStorage.getItem("user") != null;
    }

    static signout() {
        sessionStorage.clear();
    }
}