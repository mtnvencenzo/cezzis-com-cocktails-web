import { Attributes, context } from '@opentelemetry/api';
import { SeverityNumber } from '@opentelemetry/api-logs';
import { isTelemetryEnabled, otelLogger } from '../utils/otelConfig';

/* eslint-disable no-console */
class logger {
    static logException = (error: Error, attrs: Attributes = {}): void => {
        if (isTelemetryEnabled()) {
            otelLogger.emit({
                timestamp: Date.now(),
                observedTimestamp: Date.now(),
                severityNumber: SeverityNumber.ERROR, // ERROR
                severityText: 'ERROR',
                body: error.message,
                attributes: {
                    ...attrs,
                    'exception.type': error.name,
                    'exception.message': error.message,
                    'exception.stacktrace': error.originalStack ?? error.stack ?? ''
                },
                context: context?.active()
            });
        } else {
            console.error({
                error,
                attrs
            });
        }
    };

    static logInformation = (message: string, attrs: Attributes = {}): void => {
        if (isTelemetryEnabled()) {
            otelLogger.emit({
                timestamp: Date.now(),
                observedTimestamp: Date.now(),
                severityNumber: SeverityNumber.INFO,
                severityText: 'INFO',
                body: message,
                attributes: {
                    ...attrs
                },
                context: context?.active()
            });
        } else {
            console.log({
                message,
                attrs
            });
        }
    };
}
/* eslint-enable no-console */

export default logger;
