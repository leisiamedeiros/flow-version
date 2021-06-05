import { PublishedFlowResponse, BackupFlow } from "../interfaces/Resources";
import { Utilities } from "./utilities";

function handleFlowContent(resource: PublishedFlowResponse): BackupFlow | undefined {
    if (!resource) return undefined;
    const flow = JSON.stringify(resource.resource);

    return {
        flow: JSON.parse(flow),
        version: `backup_flow:${Utilities.generateVersion()}`,
        botName: resource.to.split("@")[0] ?? ""
    }
}

export {
    handleFlowContent
}