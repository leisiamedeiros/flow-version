import { Component } from 'react';

interface AlertProperties {
    message: string;
    classColor?: string;
    onClose: () => void;
}
export default class Alert extends Component<AlertProperties, any> {
    render() {
        return (
            <div className={this.getClassColor(this.props.classColor)} role="alert">
                {this.props.message}
                <button type="button" className="btn-close" onClick={() => this.props.onClose()}
                    data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        )
    }

    getClassColor(classColor?: string): string {
        return classColor ? `alert alert-${classColor} alert-dismissible fade show`
            : "alert alert-primary alert-dismissible fade show";
    }
}
