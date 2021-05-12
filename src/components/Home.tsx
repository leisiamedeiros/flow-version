import React, { Component } from 'react'
import Api from '../application/Api';
import AppHeaders, { HeadersAttributes } from '../application/Headers';
import Utilities from '../shared/utilities';
import Layout from './Layout/Layout'

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
        let headers = AppHeaders.buildHeaders(appHeaders);

        let data = {
            "id": `"${Utilities.uuidv4()}"`,
            "method": "get",
            "uri": "/buckets/blip_portal:builder_published_flow"
        }

        await this.CallApi(data, headers);
    }

    async CallApi(data: any, headers: any) {

        let result = await Api.post(
            "https://msging.net/commands", data, { headers }
        );

        console.log(result.data);
        console.log(result.data.resource);
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

