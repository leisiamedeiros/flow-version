import React, { ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';
import Alert from '../components/alert/Alert';

interface ComponentModelState<S> {
    payload: S,
    isLoading: boolean,
    redirectTo: string,
    isRedirecting: boolean,
    showAlert: boolean;
    alertMessage: string;
    alertClass: string;
}

export abstract class MainComponent<S = any, P = any> extends React.Component<P, ComponentModelState<S>> {

    initialState: ComponentModelState<S>;

    constructor(props: P, model?: S) {
        super(props);

        this.initialState = {
            payload: model ? Object.assign({}, model) as S : {} as S,
            isLoading: false,
            redirectTo: '/',
            isRedirecting: false,
            showAlert: false,
            alertMessage: '',
            alertClass: '',
        };

        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(s => {
            let model: any = { ...s.payload };
            model[name] = value;
            return { ...s, payload: model };
        });
    }

    hideAlert() {
        this.setState({
            showAlert: false
        });
    }

    setAlert(message: string, className: string) {
        this.setState({
            showAlert: true,
            alertMessage: message,
            alertClass: className
        })
    }

    showAlert() {
        if (this.state.showAlert) {
            return <Alert
                message={this.state.alertMessage}
                classColor={this.state.alertClass}
                onClose={() => this.hideAlert()}
            />
        }
    }

    async clearMessages() {
        this.setState({ alertMessage: '' });
    }

    async redirectTo(uri: string) {
        this.setState({ isRedirecting: true, redirectTo: uri });
    }

    abstract build(): JSX.Element;

    render(): JSX.Element {
        if (this.state.isRedirecting) {
            return <Redirect to={this.state.redirectTo} />;
        }
        return this.build();
    }
}
