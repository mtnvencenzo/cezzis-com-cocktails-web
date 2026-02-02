import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import AccountTermsOfServicePage from './AccountTermsOfServicePage';
import { server } from '../../../../../tests/setup';
import GlobalContext from '../../../../components/GlobalContexts';
import { DocumentFormat, LegalDocumentRs } from '../../../../api/cocktailsApi';

describe('Account Terms Of Service Page', () => {
    test('renders account terms of service page with text', async () => {
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
                    <AccountTermsOfServicePage />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = await screen.findByText('Cezzis (Cezzis) values its users terms.');
        expect(el).toBeTruthy();
    });
});
