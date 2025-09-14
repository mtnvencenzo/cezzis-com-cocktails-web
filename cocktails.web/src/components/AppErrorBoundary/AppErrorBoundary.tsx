import React from 'react';
import logger from '../../services/Logger';

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

    componentDidCatch(error: Error) {
        this.setState({ hasError: true });

        logger.logException(error);
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
