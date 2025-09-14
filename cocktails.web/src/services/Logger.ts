import { Attributes, AttributeValue, context } from '@opentelemetry/api';
import { SeverityNumber } from '@opentelemetry/api-logs';
import { isTelemetryEnabled, otelLogger } from '../utils/otelConfig';

export interface ITraceTelemetryAttribute {
    name: string;
    value: AttributeValue;
}

/* eslint-disable no-console */
class logger {
    static logException = (error: Error, attrs: Attributes | undefined = {}): void => {
        if (isTelemetryEnabled()) {
            otelLogger.emit({
                timestamp: Date.now(),
                observedTimestamp: Date.now(),
                severityNumber: SeverityNumber.ERROR, // ERROR
                severityText: 'Error',
                body: error.message,
                attributes: {
                    ...attrs,
                    'component.type': 'exception',
                    'component.error.message': error.message,
                    'component.error.name': error.name,
                    'component.error.stack': error.originalStack ?? ''
                },
                context: context?.active()
            });
        } else {
            console.log({
                error,
                attrs
            });
        }
    };

    static logInformation = (message: string, attrs: Attributes | undefined = {}): void => {
        if (isTelemetryEnabled()) {
            otelLogger.emit({
                timestamp: Date.now(),
                observedTimestamp: Date.now(),
                severityNumber: SeverityNumber.INFO,
                severityText: 'Info',
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
