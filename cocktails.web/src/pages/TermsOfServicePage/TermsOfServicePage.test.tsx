import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import TermsOfServicePage from './TermsOfServicePage';
import { LegalDocumentRs, DocumentFormat } from '../../api/cocktailsApi';
import { server } from '../../../tests/setup';
import GlobalContext from '../../components/GlobalContexts';

describe('Terms Of Service Page', () => {
    test('renders terms of service page with text', async () => {
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
                    <TermsOfServicePage />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = await screen.findByText('Cezzis (Cezzis) values its users terms.');
        expect(el).toBeTruthy();
    });
});
