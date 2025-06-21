import { ICustomProperties, IExceptionTelemetry, ITraceTelemetry } from '@microsoft/applicationinsights-web';
import { appInsights, isAppInsightsEnabled } from './AppinsightsService';

/* eslint-disable no-console */
class logger {
    static logException = (exception: IExceptionTelemetry, customProperties?: ICustomProperties): void => {
        if (isAppInsightsEnabled()) {
            appInsights.trackException(exception, customProperties);
        } else {
            console.log({
                exception,
                customProperties
            });
        }
    };

    static logInformation = (traceTelemetry: ITraceTelemetry, customProperties?: ICustomProperties): void => {
        if (isAppInsightsEnabled()) {
            appInsights.trackTrace(traceTelemetry, customProperties);
        } else {
            console.log({
                traceTelemetry,
                customProperties
            });
        }
    };
}
/* eslint-enable no-console */

export default logger;
