import { Utilities } from "../shared/utilities";
import Api from "./Api";

const COMMANDS_URL = "https://msging.net/commands";

class Commands {

    static getCheckConnectivity() {
        return {
            "id": `${Utilities.uuidv4()}`,
            "method": "get",
            "uri": "/ping"
        }
    }

    static getPublishedFlow() {
        return {
            "id": `${Utilities.uuidv4()}`,
            "method": "get",
            "uri": "/buckets/blip_portal:builder_published_flow"
        }
    }

    static createBackupFlow(flow: object, version: string) {
        return {
            "id": `${Utilities.uuidv4()}`,
            "method": "set",
            "uri": `/buckets/${version}`,
            "type": "application/json",
            "resource": flow
        }
    }

    static getBackupFlow(version: string) {
        return {
            "id": `${Utilities.uuidv4()}`,
            "method": "get",
            "uri": `/buckets/${version}`
        }
    }

    static deleteBackupFlow(version: string) {
        return {
            "id": `${Utilities.uuidv4()}`,
            "to": "postmaster@msging.net",
            "method": "delete",
            "uri": `/buckets/${version}`
        }
    }

    static getAllBackups() {
        return {
            "id": `${Utilities.uuidv4()}`,
            "to": "postmaster@msging.net",
            "method": "get",
            "uri": "/buckets"
        }
    }
}

async function SendCommand(body: object, headers: object) {
    return await Api.post(
        COMMANDS_URL, body, { headers }
    );
}


export {
    COMMANDS_URL,
    Commands,
    SendCommand
}
