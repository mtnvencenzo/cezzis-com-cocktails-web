/* eslint-disable no-restricted-globals */

import { context, Span, SpanKind } from '@opentelemetry/api';
import { otelTracer } from '../utils/otelConfig';

const startPageViewSpan = (fn: (span: Span) => void) =>
    otelTracer.startActiveSpan(
        `page view: ${location?.pathname}`,
        {
            attributes: {
                'http.request.method': 'GET',
                'url.full': location?.href,
                'url.domain': location?.hostname,
                'url.path': location?.pathname,
                'url.scheme': location?.protocol?.replace(':', ''),
                'url.query': location?.search,
                'url.hash': location?.hash,
                'user_agent.original': navigator?.userAgent,
                'browser.page.title': document?.title
            },
            kind: SpanKind.INTERNAL
        },
        context.active(),
        fn
    );

export const startLoginSpan = (fn: (span: Span) => void) =>
    otelTracer.startActiveSpan(
        `user login: ${location?.pathname}`,
        {
            attributes: {
                'http.request.method': 'GET',
                'url.full': location?.href,
                'url.domain': location?.hostname,
                'url.path': location?.pathname,
                'url.scheme': location?.protocol?.replace(':', ''),
                'url.query': location?.search,
                'url.hash': location?.hash,
                'user_agent.original': navigator?.userAgent,
                'browser.page.title': document?.title
            },
            kind: SpanKind.INTERNAL
        },
        context.active(),
        fn
    );
/* eslint-enable no-restricted-globals */

export default startPageViewSpan;
