import AppHeaders, { HeadersAttributes } from '../../application/Headers';
import Layout from '../layout/Layout';
import { MainComponent } from '../../shared/mainComponent';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Session } from '../../application/Session';
import { getCheckConnectivity, SendCommand } from '../../commands/Connectivity';

interface HomeState {
    authorization: string,
    isVaid: boolean
}
export default class Home extends MainComponent<HomeState>{

    componentDidMount() {
        let authorization = Session.getKeyString('Authorization');
        if (authorization) {
            authorization = authorization.replaceAll('"', '');
            this.setState({
                payload: {
                    ...this.state.payload, authorization, isVaid: true
                }
            });
        }
    }

    async handleSubmit() {
        const appHeaders: HeadersAttributes = { authorization: this.state.payload.authorization };
        let headers = AppHeaders.buildBlipHeaders(appHeaders);

        let commandBody = getCheckConnectivity();
        await SendCommand(commandBody, headers).then(response => {
            this.storeKey();
        }).catch(err => {
            this.setAlert(
                `Não foi possível identificar o chatbot pela chave informada! ${err.message}`,
                'danger'
            )
        });
    }

    async storeKey() {
        Session.set('Authorization', this.state.payload.authorization);
        this.setState({
            payload: {
                ...this.state.payload, isVaid: true
            }
        });
    }

    build() {
        return (
            <Layout>
                <div className="mt-4">
                    {this.showAlert()}
                    <div className="mb-3">
                        <label htmlFor="inputAuthorization" className="form-label">Authorization</label>
                        <input type="text" name="authorization" className="form-control" id="inputAuthorization"
                            aria-describedby="authorizationHelp" value={this.state.payload.authorization ?? ''}
                            onChange={this.handleChange} />
                        <div id="authorizationHelp" className="form-text">
                            O (Authorization) fica disponivel em "Informações de conexão" dentro de configurações.
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={() => this.handleSubmit()}>Validar Key</button>
                </div>
                {this.servicos()}
            </Layout>
        )
    }

    servicos(): JSX.Element {
        if (!this.state.payload.isVaid) return (<Fragment></Fragment>);
        return (
            <Fragment>
                <h5 className="mt-4 mb-3">Veja abaixo os que você pode fazer!</h5>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Backups</h5>
                                <p className="card-text">
                                    Realize e gerencie os utimos backups deste chatbot
                                </p>
                            </div>
                            <div className="card-footer bg-transparent border-light">
                                <Link to="backups" className="btn btn-primary">Selecionar</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Recursos</h5>
                                <p className="card-text">Transfira os recursos deste chatbot para outro</p>
                            </div>
                            <div className="card-footer bg-transparent border-light">
                                <Link to="/resources" className="btn btn-primary">Selecionar</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Configurações</h5>
                                <p className="card-text">Transfira as configurações deste chatbot para outro</p>
                            </div>
                            <div className="card-footer bg-transparent border-light">
                                <Link to="/" className="btn btn-primary">Selecionar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

