import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import PrivacyPolicyPageContainer from './PrivacyPolicyPageContainer';
import { LegalDocumentRs, DocumentFormat } from '../../api/cocktailsApi/cocktailsApiClient';
import { server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';

describe('Privacy Policy Page Container', () => {
    test('renders privacy policy page container with text', async () => {
        server.use(
            http.get(
                'http://localhost:0/api/v1/legal/documents/privacy-policy',
                () =>
                    HttpResponse.json<LegalDocumentRs>(
                        {
                            document: 'Cezzis (Cezzis) values its users privacy.',
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
                    <PrivacyPolicyPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = await screen.findByText('Cezzis (Cezzis) values its users privacy.');
        expect(el).toBeTruthy();
    });

    test('renders title', async () => {
        server.use(
            http.get(
                'http://localhost:0/api/v1/legal/documents/privacy-policy',
                () =>
                    HttpResponse.json<LegalDocumentRs>(
                        {
                            document: 'Cezzis (Cezzis) values its users privacy.',
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
                    <PrivacyPolicyPageContainer />
                </MemoryRouter>
            </GlobalContext>
        );

        await screen.findByText('Cezzis (Cezzis) values its users privacy.');

        expect(document.title).toBe('Privacy Policy - Cezzis.com');
    });
});
