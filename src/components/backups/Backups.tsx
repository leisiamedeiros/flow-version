import { Link } from 'react-router-dom';
import { Commands, SendCommand } from '../../application/Commands';
import AppHeaders, { HeadersAttributes } from '../../application/Headers';
import { Session } from '../../application/Session';
import { PublishedFlowResponse } from '../../interfaces/Resources';
import { MainComponent } from '../../shared/mainComponent'
import { handleFlowContent } from '../../shared/modelsHandle';
import { handleDownloadFile, Utilities } from '../../shared/utilities';
import Layout from '../layout/Layout'

interface ResourceItems {
    items: string[];
    fileDownloadUrl: string;
}
export default class Backups extends MainComponent<ResourceItems> {

    private readonly authorization = Session.getKeyString('Authorization')?.replaceAll('"', '');
    private readonly appHeaders: HeadersAttributes = { authorization: this.authorization ?? '' };
    private readonly headers = AppHeaders.buildBlipHeaders(this.appHeaders);

    componentDidMount() {
        if (!this.authorization) {
            this.redirectTo('/');
        } else {
            this.getBackups();
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    async getBackups() {
        let commandBody = Commands.getAllBackups();
        await SendCommand(commandBody, this.headers).then(response => {
            this.handleListBackups(response.data.resource);
        }).catch(err => {
            this.setAlert(
                `Não foi possível obter os dados dos backups! ${err.message}`,
                'danger'
            )
        });
    }

    handleListBackups(resource: ResourceItems) {
        let items = Utilities.returnElementsByKey(resource.items, 'backup_flow');
        this.setState({
            payload: {
                ...this.state.payload, items
            }
        });
    }

    async handleSubmitBackup() {
        let commandBody = Commands.getPublishedFlow();

        await SendCommand(commandBody, this.headers).then(response => {
            this.createBackup(response.data, this.headers);
        }).catch(err => {
            this.setAlert(
                `Não foi possível obter o fluxo publicado! ${err.message}`,
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
                this.getBackups();
            }).catch(err => {
                this.setAlert(
                    `Não foi possível efetuar o backup! ${err.message}`,
                    'danger',
                )
            });
    }

    async deleteBackup(version: string) {
        let commandBody = Commands.deleteBackupFlow(version);

        await SendCommand(commandBody, this.headers).then(response => {
            this.setAlert(
                `Backup removido com sucesso!`,
                'success'
            )
            this.getBackups();
        }).catch(err => {
            this.setAlert(
                `Não foi possível remover o backup! ${err.message}`,
                'danger'
            )
        });
    }

    async downloadFile(version: string) {
        let commandBody = Commands.getBackupFlow(version);

        await SendCommand(commandBody, this.headers).then(response => {
            const setringfyFlow = JSON.stringify(response.data.resource);
            handleDownloadFile(setringfyFlow, version);
        }).catch(err => {
            this.setAlert(
                `Não foi possível obter o backup! ${err.message}`,
                'danger'
            )
        });
    }

    build(): JSX.Element {
        return (
            <Layout>
                <div className="row justify-content-md-left mt-4">
                    <div className="col-md-12">
                        {this.showAlert()}

                        <div className="card">
                            <div className="card-body">
                                <h6>Para realizar um backup do ultimo fluxo publicado click no botao abaixo</h6>
                                <button type="submit" className="btn btn-success" onClick={() => this.handleSubmitBackup()}>Backup</button>
                            </div>
                        </div>

                        <h6 className="mt-4">Listagem dos backups</h6>
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Versão</th>
                                    <th scope="col">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.payload.items?.map((item: string, index: number) =>
                                        <tr key={index}>
                                            <td>{item}</td>
                                            <td>
                                                <button type="button" className="btn btn-sm btn-primary"
                                                    onClick={() => this.downloadFile(item)} >Baixar
                                                </button>

                                                <button type="button" className="btn btn-sm btn-danger ms-2"
                                                    onClick={() => this.deleteBackup(item)} >Remover
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Link to="/" className="btn btn-secondary">Voltar</Link>
            </Layout>
        )
    }
}
