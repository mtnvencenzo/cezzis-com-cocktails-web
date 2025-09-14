/* eslint-disable no-restricted-globals */

import { context, Span, SpanKind } from '@opentelemetry/api';
import { otelTracer } from '../utils/otelConfig';

/* eslint-disable no-nested-ternary */
const startPageViewSpan = (fn: (span: Span) => void) =>
    otelTracer.startActiveSpan(
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

export default startPageViewSpan;
