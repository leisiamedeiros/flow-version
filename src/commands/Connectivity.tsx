import Api from "../application/Api";
import { Utilities } from "../shared/utilities";

const COMMANDS_URL = "https://msging.net/commands";

function getCheckConnectivity() {
    return {
        "id": `${Utilities.uuidv4()}`,
        "method": "get",
        "uri": "/ping"
    }
}

async function SendCommand(body: object, headers: object) {
    return await Api.post(
        COMMANDS_URL, body, { headers }
    );
}

export {
    COMMANDS_URL,
    getCheckConnectivity,
    SendCommand
}
