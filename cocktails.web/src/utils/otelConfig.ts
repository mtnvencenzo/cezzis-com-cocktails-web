import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { BatchSpanProcessor, SpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { context, Span, SpanKind, trace } from '@opentelemetry/api';
import { getWindowEnv } from './envConfig';

export const isTelemetryEnabled = (): boolean => {
    if (getWindowEnv().VITE_TELEMETRY_URL) {
        return true;
    }

    return false;
};

export const tracer = trace.getTracer('cezzis-com-cocktails-web');

export const setupTelemetry = () => {
    const resource = resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'cocktails-web',
        'service.namespace': 'cocktails-web',
        'deployment.environment': getWindowEnv().VITE_NODE_ENV?.toLowerCase() ?? 'unknown',
        'app.unit': 'cocktails',
        app_product: 'cezzis.com',
        app_product_segment: 'frontend',
        app_name: 'cezzis-com-cocktails-web',
        app_class: 'ux',
        app_env: getWindowEnv().VITE_NODE_ENV?.toLowerCase() ?? 'unknown'
    });

    const spanProcessors: SpanProcessor[] = [];

    if (isTelemetryEnabled()) {
        const otlpExporter = new OTLPTraceExporter({
            url: `${getWindowEnv().VITE_TELEMETRY_URL}/v1/traces`
        });

        spanProcessors.push(new BatchSpanProcessor(otlpExporter));
    }

    const provider = new WebTracerProvider({
        resource,
        spanProcessors: [...spanProcessors]
    });

    provider.register({
        contextManager: new ZoneContextManager()
    });

    // Instantiate instrumentations and enable them
    const instrumentations = [
        new DocumentLoadInstrumentation(),
        new FetchInstrumentation({
            propagateTraceHeaderCorsUrls: [/.*$/]
        }),
        new XMLHttpRequestInstrumentation({
            propagateTraceHeaderCorsUrls: [/.*$/]
        })
    ];

    registerInstrumentations({
        instrumentations
    });
};

/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
export const startPageViewSpan = (fn: (span: Span) => void) =>
    tracer.startActiveSpan(
        `page view: ${location?.pathname}`,
        {
            attributes: {
                'http.method': 'GET',
                'http.request.method': 'GET',
                'url.full': location?.href,
                'url.domain': location?.hostname,
                'url.path': location?.pathname,
                'url.scheme': location?.protocol?.replace(':', ''),
                'url.query': location?.search,
                'url.hash': location?.hash,
                'server.port': location?.port ? parseInt(location.port, 10) : location?.protocol === 'https:' ? 443 : 80,
                'user_agent.original': navigator?.userAgent
            },
            kind: SpanKind.SERVER
        },
        context.active(),
        fn
    );
/* eslint-enable no-nested-ternary */
/* eslint-enable no-restricted-globals */
