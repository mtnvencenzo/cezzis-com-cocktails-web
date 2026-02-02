import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import TermsOfServicePageContainer from './TermsOfServicePageContainer';
import { LegalDocumentRs, DocumentFormat } from '../../api/cocktailsApi';
import { server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';

describe('Terms Of Service Page Container', () => {
    test('renders terms of service page container with text', async () => {
        server.use(
            http.get(
                'http://localhost:0/api/v1/legal/documents/terms-of-service',
                () =>
                    HttpResponse.json<LegalDocumentRs>(
                        {
                            document: 'Cezzis (Cezzis) values its users terms.',
                            format: DocumentFormat.Markdown
                        },
                        {
                            status: 200,
                            statusText: 'OK'
                        }
                    ),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <TermsOfServicePageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = await screen.findByText('Cezzis (Cezzis) values its users terms.');
        expect(el).toBeTruthy();
    });

    test('renders title', async () => {
        server.use(
            http.get(
                'http://localhost:0/api/v1/legal/documents/terms-of-service',
                () =>
                    HttpResponse.json<LegalDocumentRs>(
                        {
                            document: 'Cezzis (Cezzis) values its users terms.',
                            format: DocumentFormat.Markdown
                        },
                        {
                            status: 200,
                            statusText: 'OK'
                        }
                    ),
                { once: true }
            )
        );

        render(
            <GlobalContext>
                <MemoryRouter>
                    <TermsOfServicePageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        await screen.findByText('Cezzis (Cezzis) values its users terms.');

        expect(document.title).toBe('Terms Of Service - Cezzis.com');
    });
});
