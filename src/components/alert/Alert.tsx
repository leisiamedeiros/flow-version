import React, { Component } from 'react'

interface AlertProperties {
    message: string;
    classColor: string;
}
export default class Alert extends Component<any, any> {
    render() {
        return (
            <div className={this.getClassColor(this.props.classColor)} role="alert">
                {this.props.message}
            </div>
        )
    }

    getClassColor(classColor: string): string {
        return classColor ? `alert alert-${classColor}`
            : "alert alert-primary";
    }
}
