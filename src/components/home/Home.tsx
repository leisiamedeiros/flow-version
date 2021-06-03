import { Component } from 'react'
import { Commands, SendCommand } from '../../application/Commands';
import AppHeaders, { HeadersAttributes } from '../../application/Headers';
import { PublishedFlowResponse, BackupFlow } from '../../interfaces/Resources';
import Utilities from '../../shared/utilities';
import Layout from '../layout/Layout'


export default class Home extends Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            authorization: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(event: any) {
        this.setState({
            authorization: event.target.value
        });
    }

    async handleSubmit() {
        const appHeaders: HeadersAttributes = { authorization: this.state.authorization };
        let headers = AppHeaders.buildBlipHeaders(appHeaders);

        let commandBody = Commands.getPublishedFlow();
        let result = await SendCommand(commandBody, headers);

        await this.createBackup(result.data, headers);
    }

    async createBackup(resource: PublishedFlowResponse, headers: object) {
        let backupFlow = this.handleFlowContent(resource);
        if (!backupFlow) return;

        let commandBody = Commands.createBackupFlow(backupFlow.flow, backupFlow.version);
        console.log(commandBody);
        let result = await SendCommand(commandBody, headers);
        console.log(result);
    }

    handleFlowContent(resource: PublishedFlowResponse): BackupFlow | undefined {
        if (!resource) return undefined;
        const flow = JSON.stringify(resource.resource);

        let bkpFlow = {} as BackupFlow;
        bkpFlow.flow = JSON.parse(flow);
        bkpFlow.version = `backup_flow:${Utilities.generateVersion()}`;
        bkpFlow.botName = resource.to.split("@")[0] ?? "";

        return bkpFlow;
    }

    render() {
        return (
            <Layout>
                <div>
                    <div className="mb-3">
                        <label htmlFor="inputAuthorization" className="form-label">Authorization</label>
                        <input type="text" name="authorization" className="form-control" id="inputAuthorization"
                            aria-describedby="authorizationHelp" value={this.state.authorization} onChange={this.handleChange} />
                        <div id="authorizationHelp" className="form-text">
                            O (Authorization) fica disponivel em "Informações de conexão" dentro de configurações.
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => this.handleSubmit()}>Submit</button>
                </div>
            </Layout>
        )
    }

}

