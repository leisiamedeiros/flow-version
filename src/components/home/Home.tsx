import { ChangeEvent, Component } from 'react'
import { Commands, SendCommand } from '../../application/Commands';
import AppHeaders, { HeadersAttributes } from '../../application/Headers';
import { PublishedFlowResponse } from '../../interfaces/Resources';
import Layout from '../layout/Layout';
import Alert from '../alert/Alert';
import { handleFlowContent } from '../../shared/modelsHandle';

export default class Home extends Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            authorization: '',
            mustShowMessage: false,
            message: '',
            statusMessage: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            authorization: event.target.value
        });
    }

    async handleSubmit() {
        const appHeaders: HeadersAttributes = { authorization: this.state.authorization };
        let headers = AppHeaders.buildBlipHeaders(appHeaders);

        let commandBody = Commands.getPublishedFlow();

        await SendCommand(commandBody, headers).then(response => {
            this.createBackup(response.data, headers);
        }).catch(err => {
            this.setState({
                message: `Não foi possível obter o fluxo! ${err.message}`,
                statusMessage: 'danger',
                mustShowMessage: true
            })
        });
        this.hideAlert(4000);
    }

    async createBackup(resource: PublishedFlowResponse, headers: object) {
        let backupFlow = handleFlowContent(resource);
        if (!backupFlow) return;

        let commandBody = Commands.createBackupFlow(backupFlow.flow, backupFlow.version);

        await SendCommand(commandBody, headers)
            .then(response => {
                this.setState({
                    message: `Backup ${backupFlow?.version} criado com sucesso! `,
                    statusMessage: 'success',
                    mustShowMessage: true
                })
            }).catch(err => {
                this.setState({
                    message: `Não foi possível efetuar o backup! ${err.message}`,
                    statusMessage: 'danger',
                    mustShowMessage: true
                })
            });

        this.hideAlert(5000);
    }

    render() {
        return (
            <Layout>
                <div>
                    {this.alertComponent()}
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

    alertComponent() {
        if (this.state.mustShowMessage)
            return <Alert message={this.state.message} classColor={this.state.statusMessage} />
    }

    hideAlert(seconds: number) {
        setTimeout(() => {
            this.setState({
                mustShowMessage: false
            })
        }, seconds);
    }

}

