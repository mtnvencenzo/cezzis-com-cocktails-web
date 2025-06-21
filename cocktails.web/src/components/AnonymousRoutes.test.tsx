import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AnonymousRoutes from './AnonymousRoutes';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import GlobalContext from './GlobalContexts';

describe('Anonymous routes', () => {
    test('renders welcome page', async () => {
        render(
            <GlobalContext>
                <BrowserRouter>
                    <Routes>
                        <Route element={<AnonymousRoutes />}>
                            <Route element={<WelcomePage />} path='/' />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </GlobalContext>
        );

        const searchBox = await screen.findByTestId('search-box');
        expect(searchBox).toBeTruthy();
    });
});
