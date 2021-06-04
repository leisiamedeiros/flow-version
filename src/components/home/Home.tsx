import { Commands, SendCommand } from '../../application/Commands';
import AppHeaders, { HeadersAttributes } from '../../application/Headers';
import { PublishedFlowResponse } from '../../interfaces/Resources';
import Layout from '../layout/Layout';
import Alert from '../alert/Alert';
import { handleFlowContent } from '../../shared/modelsHandle';
import { MainComponent } from '../../shared/mainComponent';

interface HomeState {
    authorization: string,
}
export default class Home extends MainComponent<HomeState>{

    constructor(props: any) {
        super(props);
    }

    async handleSubmit() {
        const appHeaders: HeadersAttributes = { authorization: this.state.payload.authorization };
        let headers = AppHeaders.buildBlipHeaders(appHeaders);

        let commandBody = Commands.getPublishedFlow();

        await SendCommand(commandBody, headers).then(response => {
            this.createBackup(response.data, headers);
        }).catch(err => {
            this.setAlert(
                `Não foi possível obter o fluxo! ${err.message}`,
                'danger'
            )
        });
    }

    async createBackup(resource: PublishedFlowResponse, headers: object) {
        let backupFlow = handleFlowContent(resource);
        if (!backupFlow) return;

        let commandBody = Commands.createBackupFlow(backupFlow.flow, backupFlow.version);

        await SendCommand(commandBody, headers)
            .then(response => {
                this.setAlert(
                    `Backup ${backupFlow?.version} criado com sucesso! `,
                    'success',
                )
            }).catch(err => {
                this.setAlert(
                    `Não foi possível efetuar o backup! ${err.message}`,
                    'danger',
                )
            });
    }

    build() {
        return (
            <Layout>
                <div>
                    {this.alertComponent()}
                    <div className="mb-3">
                        <label htmlFor="inputAuthorization" className="form-label">Authorization</label>
                        <input type="text" name="authorization" className="form-control" id="inputAuthorization"
                            aria-describedby="authorizationHelp" value={this.state.payload.authorization} onChange={this.handleChange} />
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
        if (this.state.showAlert) {
            return <Alert
                message={this.state.alertMessage}
                classColor={this.state.alertClass}
                onClose={() => this.hideAlert()}
            />
        }
    }

}

