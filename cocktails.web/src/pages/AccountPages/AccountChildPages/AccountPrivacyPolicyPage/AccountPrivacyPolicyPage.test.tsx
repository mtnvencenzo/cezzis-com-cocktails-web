import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import AccountPrivacyPolicyPage from './AccountPrivacyPolicyPage';
import { LegalDocumentRs, DocumentFormat } from '../../../../api/cocktailsApi/cocktailsApiClient';
import { server } from '../../../../../tests/setup';
import GlobalContext from '../../../../components/GlobalContexts';

describe('Account Privacy Policy Page', () => {
    test('renders account privacy policy page with text', async () => {
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
                    <AccountPrivacyPolicyPage />
                </MemoryRouter>
            </GlobalContext>
        );

        const el = await screen.findByText('Cezzis (Cezzis) values its users privacy.');
        expect(el).toBeTruthy();
    });
});
