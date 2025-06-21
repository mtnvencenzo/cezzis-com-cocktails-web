import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { getWindowEnv } from '../utils/envConfig';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: getWindowEnv().VITE_INSTRUMENTATION_KEY,
        enableAutoRouteTracking: true,
        autoExceptionInstrumented: true,
        extensions: [reactPlugin],
        enableCorsCorrelation: true,
        disableFetchTracking: false,
        disableAjaxTracking: false
    }
});

appInsights.addTelemetryInitializer((envelope) => {
    if (envelope?.data?.baseData) {
        const telemetryItem = envelope.data.baseData;
        telemetryItem.Properties = telemetryItem.Properties || {};

        telemetryItem.Properties.cz_unit = 'Cocktails';
        telemetryItem.Properties.cz_product = 'Cezzis.Com';
        telemetryItem.Properties.cz_product_segment = 'UX';
        telemetryItem.Properties.cz_appname = 'Cocktails';
        telemetryItem.Properties.cz_appclass = 'Cocktails.Web';
        telemetryItem.Properties.cz_appenv = getWindowEnv().VITE_NODE_ENV;
    }
});

const isAppInsightsEnabled = (): boolean => {
    if (getWindowEnv().VITE_NODE_ENV === 'production' && getWindowEnv().VITE_INSTRUMENTATION_KEY !== '00000000-0000-0000-0000-000000000000') {
        return true;
    }

    return false;
};

if (isAppInsightsEnabled()) {
    appInsights.loadAppInsights();
}

export { reactPlugin, appInsights, isAppInsightsEnabled };
