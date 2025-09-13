import { Attributes, AttributeValue, SpanStatusCode } from '@opentelemetry/api';
import { isTelemetryEnabled, tracer } from '../utils/otelConfig';

export interface ITraceTelemetryAttribute {
    name: string;
    value: AttributeValue;
}

/* eslint-disable no-console */
class logger {
    static logException = (error: Error, attrs: Attributes | undefined = undefined): void => {
        if (isTelemetryEnabled()) {
            const span = tracer.startSpan('exception-error');
            span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
            span.recordException(error);
            span.setAttribute('component.stack', error.originalStack ?? '');

            if (attrs && attrs instanceof Object && Object.keys(attrs).length > 0) {
                span.setAttributes(attrs);
            }

            span.end();
        } else {
            console.log({
                error,
                attrs
            });
        }
    };

    static logInformation = (message: string, attrs: Attributes | undefined = undefined): void => {
        if (isTelemetryEnabled()) {
            const span = tracer.startSpan(message);

            if (attrs && attrs instanceof Object && Object.keys(attrs).length > 0) {
                span.setAttributes(attrs);
            }

            span.end();
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
