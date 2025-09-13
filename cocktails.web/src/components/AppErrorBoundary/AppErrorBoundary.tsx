import React from 'react';
import { SpanStatusCode } from '@opentelemetry/api';
import { tracer } from '../../utils/otelConfig';

export interface IAppErrorBoundaryProps {
    onError: React.ComponentType<unknown>;
    children: React.ReactElement;
}

export interface IAppErrorBoundaryState {
    hasError: boolean;
}

export default class AppErrorBoundary extends React.Component<IAppErrorBoundaryProps, IAppErrorBoundaryState> {
    constructor(props: IAppErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ hasError: true });

        // Send error to OpenTelemetry
        const span = tracer.startSpan('Unhandled exception / boundary-error');
        span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
        span.recordException(error);
        span.setAttribute('component-stack', errorInfo.componentStack ?? '');
        span.end();
    }

    render() {
        const { onError, children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return React.createElement(onError);
        }

        return children;
    }
}
