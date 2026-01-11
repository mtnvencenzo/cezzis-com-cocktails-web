import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { BatchSpanProcessor, SpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource, resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { trace } from '@opentelemetry/api';
import { LoggerProvider, BatchLogRecordProcessor, LogRecordProcessor } from '@opentelemetry/sdk-logs';
import { logs } from '@opentelemetry/api-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { getWindowEnv } from './envConfig';

export const isTelemetryEnabled = (): boolean => {
    if (getWindowEnv().VITE_TELEMETRY_URL) {
        return true;
    }

    return false;
};

export const otelTracer = trace.getTracer('cezzis-com-cocktails-web');
export const otelLogger = logs.getLogger('cezzis-com-cocktails-web');

const setupTracing = (resource: Resource): WebTracerProvider => {
    const spanProcessors: SpanProcessor[] = [];

    const otlpExporter = new OTLPTraceExporter({
        url: `${getWindowEnv().VITE_TELEMETRY_URL}/v1/traces`,
        headers: getWindowEnv().VITE_TELEMETRY_KEY ? { Authorization: `Bearer ${getWindowEnv().VITE_TELEMETRY_KEY}` } : undefined
    });

    spanProcessors.push(new BatchSpanProcessor(otlpExporter));

    const provider = new WebTracerProvider({
        resource,
        spanProcessors: [...spanProcessors]
    });

    provider.register({
        contextManager: new ZoneContextManager()
    });

    return provider;
};

const setupLogging = (resource: Resource): LoggerProvider => {
    const processors: LogRecordProcessor[] = [];

    const otlpExporter = new OTLPLogExporter({
        url: `${getWindowEnv().VITE_TELEMETRY_URL}/v1/logs`,
        headers: getWindowEnv().VITE_TELEMETRY_KEY ? { Authorization: `Bearer ${getWindowEnv().VITE_TELEMETRY_KEY}` } : undefined
    });

    processors.push(new BatchLogRecordProcessor(otlpExporter));

    const loggerProvider = new LoggerProvider({
        resource,
        processors
    });

    logs.setGlobalLoggerProvider(loggerProvider);

    return loggerProvider;
};

export const setupTelemetry = () => {
    // prevent double registration in dev/SSR/HMR
    /* eslint-disable @typescript-eslint/no-explicit-any */
    if ((window as any).cezzisTelemetrySetupDone) {
        return;
    }
    (window as any).cezzisTelemetrySetupDone = true;
    /* eslint-enable @typescript-eslint/no-explicit-any */

    if (!isTelemetryEnabled()) {
        return;
    }

    const resource = resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'cocktails-web',
        'service.namespace': 'cocktails-web',
        'deployment.environment': getWindowEnv().VITE_NODE_ENV?.toLowerCase() ?? 'unknown',
        'app.unit': 'cocktails',
        'app.product': 'cezzis.com',
        'app.product_segment': 'frontend',
        'app.name': 'cezzis-com-cocktails-web',
        'app.class': 'ux',
        'app.env': getWindowEnv().VITE_NODE_ENV?.toLowerCase() ?? 'unknown'
    });

    const traceProvider = setupTracing(resource);
    const loggerProvider = setupLogging(resource);

    // Instantiate instrumentations and enable them
    const instrumentations = [
        new DocumentLoadInstrumentation(),
        new FetchInstrumentation({
            propagateTraceHeaderCorsUrls: [/.*$/],
            ignoreUrls: [/^https:\/\/cezzis\.us\.auth0\.com(?:\/|$)/, /^https:\/\/.*?login\.cezzis\.com(?:\/|$)/, /^https?:\/\/[^/]+:4318\/v1\/(?:traces|logs|metrics)$/]
        }),
        new XMLHttpRequestInstrumentation({
            propagateTraceHeaderCorsUrls: [/.*$/],
            ignoreUrls: [/^https:\/\/cezzis\.us\.auth0\.com(?:\/|$)/, /^https:\/\/.*?login\.cezzis\.com(?:\/|$)/, /^https?:\/\/[^/]+:4318\/v1\/(?:traces|logs|metrics)$/]
        })
    ];

    registerInstrumentations({
        tracerProvider: traceProvider,
        loggerProvider,
        instrumentations
    });
};
