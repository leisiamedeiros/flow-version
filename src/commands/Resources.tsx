import { Utilities } from "../shared/utilities";

export default class ResourcesCommands {

    static getAllResources() {
        return {
            "id": `${Utilities.uuidv4()}`,
            "method": "get",
            "uri": "/resources"
        }
    }

    static getResource(resourceKey: string) {
        return {
            "id": `${Utilities.uuidv4()}`,
            "method": "get",
            "uri": `/resources/${resourceKey}`
        }
    }

    static createResource(resourceKey: string, resource: string, type: string) {
        return {
            "id": `${Utilities.uuidv4()}`,
            "method": "set",
            "uri": `/resources/${resourceKey}`,
            "type": `${type}`,
            "resource": `${resource}`
        }
    }
}