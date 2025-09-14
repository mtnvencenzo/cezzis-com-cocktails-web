import React from 'react';
import logger from '../../services/Logger';

export interface IAppErrorBoundaryProps {
    onError: React.ComponentType<unknown>;
    children: React.ReactNode;
}

export interface IAppErrorBoundaryState {
    hasError: boolean;
}

export default class AppErrorBoundary extends React.Component<IAppErrorBoundaryProps, IAppErrorBoundaryState> {
    constructor(props: IAppErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): IAppErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
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
