import AppHeaders, { HeadersAttributes } from '../../application/Headers';
import { Session } from '../../application/Session';
import { SendCommand } from '../../commands/Connectivity';
import ResourcesCommands from '../../commands/Resources';
import { Resource, ResourceResponse } from '../../interfaces/Resources';
import { MainComponent } from '../../shared/mainComponent';
import Layout from '../layout/Layout';

interface ResourceState extends Resource {
    destinationAuthorization: string;
    resourceKey: string;
    resources: ResourceResponse;
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
        resources.items.forEach(resKey => {
            commandBody = ResourcesCommands.getResource(resKey);
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
                    <button type="submit" className="btn btn-success" onClick={() => this.handleSubmit()}>Validar Key</button>
                </div>
            </Layout>
        )
    }

}
