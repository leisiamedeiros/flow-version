import AppHeaders, { HeadersAttributes } from '../../application/Headers';
import { Session } from '../../application/Session';
import { getCheckConnectivity, SendCommand } from '../../commands/Connectivity';
import ResourcesCommands from '../../commands/Resources';
import { Resource, ResourceResponse } from '../../interfaces/Resources';
import { MainComponent } from '../../shared/mainComponent';
import { Utilities } from '../../shared/utilities';
import Layout from '../layout/Layout';

interface ResourceState extends Resource {
    destinationAuthorization: string;
    resourceKey: string;
    resources: ResourceResponse;
    resourcesDetails: Resource[];
}
export default class Resources extends MainComponent<ResourceState> {

    private readonly authorization = Session.getKeyString('Authorization')?.replaceAll('"', '');
    private readonly appHeaders: HeadersAttributes = { authorization: this.authorization ?? '' };
    private readonly headers = AppHeaders.buildBlipHeaders(this.appHeaders);

    componentDidMount() {
        if (!this.authorization) {
            this.redirectTo('/');
        } else {
            this.getAllResources();
        }
    }

    async getAllResources() {
        let commandBody = ResourcesCommands.getAllResources();
        await SendCommand(commandBody, this.headers).then(response => {
            this.handleListResources(response.data.resource);
        }).catch(err => {
            this.setAlert(
                `Não foi possível obter a lista de recursos! ${err.message}`,
                'danger'
            )
        });
    }

    async handleListResources(resources: ResourceResponse) {
        this.setState({
            payload: {
                ...this.state.payload, resources
            }
        });

        await this.getResourceDetails(resources);
    }

    async getResourceDetails(resources: ResourceResponse) {
        let commandBody;
        let resourcesDetails = [] as Resource[];

        resources.items.forEach(async resKey => {
            commandBody = ResourcesCommands.getResource(resKey);
            await SendCommand(commandBody, this.headers).then(response => {
                resourcesDetails.push({
                    resource: response.data.resource, type: response.data.type, resourceKey: resKey
                });
            })
        });

        this.setState({
            payload: {
                ...this.state.payload, resourcesDetails
            }
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    handleSubmit(): void {
        if (this.isInvalid()) {
            this.setAlert(
                "O codigo Authorization não pode ser vazio e deve ser diferente do codigo de origem",
                "danger"
            );
            return;
        }

        let destinationHeader = AppHeaders.buildBlipHeaders({ authorization: this.state.payload.destinationAuthorization });
        this.handleRequestBotDestination(destinationHeader);
    }

    async handleRequestBotDestination(headers: object) {
        let commandBody = getCheckConnectivity();
        await SendCommand(commandBody, headers).then(async response => {

            await this.CreateResourceDestination(headers).then(res => {
                this.setAlert(
                    `Os recursos foram transferidos para o chatbot de destino:
                    ${Utilities.returnBotName(response.data.to)}`,
                    'success'
                )
            });

        }).catch(err => {
            this.setAlert(
                `Não foi possível identificar o chatbot pela chave informada! ${err.message}`,
                'danger'
            )
        });
    }

    async CreateResourceDestination(destinationHeader: object) {
        let commandBody;

        this.state.payload.resourcesDetails.forEach(async resource => {
            commandBody = ResourcesCommands.createResource(resource.resourceKey, resource.resource, resource.type);
            await SendCommand(commandBody, destinationHeader).catch(err => {
                this.setAlert(
                    `Não foi possível realizar a criação de algum recurso! ${err.message}`,
                    'danger'
                )
            })
        });
    }

    isInvalid(): boolean {
        if (!this.state.payload.destinationAuthorization) return true;
        if (this.state.payload.destinationAuthorization.trim() === this.authorization?.trim()) {
            return true;
        }
        return false;
    }

    build() {
        return (
            <Layout>
                <div className="mt-4">
                    {this.showAlert()}
                    <h4>Copie os recursos do seu chatbot para outro inserindo abaixo a chave do chatbot de <b>destino!</b></h4>
                    <div className="mb-3">
                        <label htmlFor="inputDestAuthorization" className="form-label">Authorization</label>
                        <input type="text" name="destinationAuthorization" className="form-control" id="inputDestAuthorization"
                            aria-describedby="authorizationDestHelp" value={this.state.payload.destinationAuthorization ?? ''}
                            onChange={this.handleChange} />
                        <div id="authorizationDestHelp" className="form-text">
                            O (Authorization) fica disponivel em "Informações de conexão" dentro de configurações.
                            Esta chave authorization é do chatbot de destino.
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={() => this.handleSubmit()}>Transferir recursos</button>
                </div>
            </Layout>
        )
    }

}
