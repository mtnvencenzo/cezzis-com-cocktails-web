import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import AuthRoutes from './components/AuthRoutes';
import AnonymousRoutes from './components/AnonymousRoutes';
import Layout from './templates/Layout/Layout';
import GlobalContext from './components/GlobalContexts';
import './App.css';
import { useAuth0 } from './components/Auth0Provider';
import { useOwnedAccount } from './components/OwnedAccountContext';
import { loadOwnedAccountProfileData } from './utils/authConfig';

const FullScreenLayout = React.lazy(() => import('./templates/FullScreenLayout/FullScreenLayout'));
const FrontChannelLogout = React.lazy(() => import('./pages/FrontChannelLogout/FrontChannelLogout'));
const AccessErrorComponent = React.lazy(() => import('./molecules/AccessErrorComponent/AccessErrorComponent'));
const PathNotFound = React.lazy(() => import('./components/PathNotFound'));

const WelcomePage = React.lazy(() => import('./pages/WelcomePage/WelcomePage'));
const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage/AboutUsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage/ContactPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage/PrivacyPolicyPage'));
const TermsOfServicePage = React.lazy(() => import('./pages/TermsOfServicePage/TermsOfServicePage'));

const AccountPage = React.lazy(() => import('./pages/AccountPages/AccountPage/AccountPage'));
const LoginRedirect = React.lazy(() => import('./pages/LoginRedirect/LoginRedirect'));
const AccountIndexPageNavigator = React.lazy(() => import('./pages/AccountPages/AccountIndexPageNavigator/AccountIndexPageNavigator'));
const AccountNavigationPage = React.lazy(() => import('./pages/AccountPages/AccountChildPages/AccountNavigationPage/AccountNavigationPage'));
const AccountProfileImagePage = React.lazy(() => import('./pages/AccountPages/AccountChildPages/AccountProfileImagePage/AccountProfileImagePage'));
const AccountPersonalDetailsPage = React.lazy(() => import('./pages/AccountPages/AccountChildPages/AccountPersonalDetailsPage/AccountPersonalDetailsPage'));
const AccountChangeEmailPage = React.lazy(() => import('./pages/AccountPages/AccountChildPages/AccountChangeEmailPage/AccountChangeEmailPage'));
const AccountAccessibilityPage = React.lazy(() => import('./pages/AccountPages/AccountChildPages/AccountAccessibilityPage/AccountAccessibilityPage'));
const AccountFavoriteCocktailsPage = React.lazy(() => import('./pages/AccountPages/AccountChildPages/AccountFavoriteCocktailsPage/AccountFavoriteCocktailsPage'));
const AccountTermsOfServicePage = React.lazy(() => import('./pages/AccountPages/AccountChildPages/AccountTermsOfServicePage/AccountTermsOfServicePage'));
const AccountPrivacyPolicyPage = React.lazy(() => import('./pages/AccountPages/AccountChildPages/AccountPrivacyPolicyPage/AccountPrivacyPolicyPage'));
const AccountCocktailRatingsPage = React.lazy(() => import('./pages/AccountPages/AccountChildPages/AccountCocktailRatingsPage/AccountCocktailRatingsPage'));
const AccountNotificationsPage = React.lazy(() => import('./pages/AccountPages/AccountChildPages/AccountNotificationsPage/AccountNotificationsPage'));

const CocktailPage = React.lazy(() => import('./pages/CocktailPage/CocktailPage'));
const CocktailsSearchPage = React.lazy(() => import('./pages/CocktailsSearchPage/CocktailsSearchPage'));
const CocktailsListPage = React.lazy(() => import('./pages/CocktailsListPage/CocktailsListPage'));
const FavoriteCocktailsPage = React.lazy(() => import('./pages/FavoriteCocktailsPage/FavoriteCocktailsPage'));

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <AnonymousRoutes />,
            children: [
                {
                    path: '/iam/auth/redirect',
                    element: (
                        <React.Suspense>
                            <LoginRedirect />
                        </React.Suspense>
                    )
                },
                {
                    path: '',
                    element: <Layout />,
                    children: [
                        {
                            index: true,
                            element: (
                                <React.Suspense>
                                    <WelcomePage />
                                </React.Suspense>
                            )
                        },
                        {
                            path: '/about-us',
                            element: (
                                <React.Suspense>
                                    <AboutUsPage />
                                </React.Suspense>
                            )
                        },
                        {
                            path: '/contact',
                            element: (
                                <React.Suspense>
                                    <ContactPage />
                                </React.Suspense>
                            )
                        },
                        {
                            path: '/privacy-policy',
                            element: (
                                <React.Suspense>
                                    <PrivacyPolicyPage enableWidePadding />
                                </React.Suspense>
                            )
                        },
                        {
                            path: '/terms-of-service',
                            element: (
                                <React.Suspense>
                                    <TermsOfServicePage enableWidePadding />
                                </React.Suspense>
                            )
                        },
                        {
                            path: '*',
                            element: <PathNotFound />
                        }
                    ]
                },
                {
                    path: '/signout',
                    element: <Layout />,
                    children: [
                        {
                            index: true,
                            element: (
                                <React.Suspense>
                                    <FrontChannelLogout />
                                </React.Suspense>
                            )
                        }
                    ]
                },
                {
                    path: '/cocktails',
                    element: <Layout />,
                    children: [
                        {
                            path: '/cocktails/list',
                            element: (
                                <React.Suspense>
                                    <CocktailsListPage />
                                </React.Suspense>
                            )
                        },
                        {
                            path: '/cocktails/search',
                            element: (
                                <React.Suspense>
                                    <CocktailsSearchPage />
                                </React.Suspense>
                            )
                        },
                        {
                            path: '/cocktails/:id',
                            element: (
                                <React.Suspense>
                                    <CocktailPage />
                                </React.Suspense>
                            )
                        },
                        {
                            path: '*',
                            element: <PathNotFound />
                        }
                    ]
                },
                {
                    path: '*',
                    element: <PathNotFound />
                }
            ]
        },
        {
            path: '/my',
            element: <AuthRoutes />,
            children: [
                {
                    path: '/my/favorite-cocktails',
                    element: <Layout />,
                    children: [
                        {
                            path: '',
                            index: true,
                            element: (
                                <React.Suspense>
                                    <FavoriteCocktailsPage />
                                </React.Suspense>
                            )
                        },
                        {
                            path: '*',
                            element: <PathNotFound />
                        }
                    ]
                }
            ]
        },
        {
            path: '/account',
            element: <AuthRoutes />,
            children: [
                {
                    path: '/account',
                    element: <FullScreenLayout />,
                    children: [
                        {
                            path: '',
                            element: (
                                <React.Suspense>
                                    <AccountPage />
                                </React.Suspense>
                            ),
                            children: [
                                {
                                    index: true,
                                    element: (
                                        <React.Suspense>
                                            <AccountIndexPageNavigator />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/profile-center',
                                    element: (
                                        <React.Suspense>
                                            <AccountIndexPageNavigator />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/settings',
                                    element: (
                                        <React.Suspense>
                                            <AccountNavigationPage />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/profile-center/avatar',
                                    element: (
                                        <React.Suspense>
                                            <AccountProfileImagePage />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/profile-center/personal-details',
                                    element: (
                                        <React.Suspense>
                                            <AccountPersonalDetailsPage />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/profile-center/change-email',
                                    element: (
                                        <React.Suspense>
                                            <AccountChangeEmailPage />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/profile-center/accessibility',
                                    element: (
                                        <React.Suspense>
                                            <AccountAccessibilityPage />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/interactions/favorite-cocktails',
                                    element: (
                                        <React.Suspense>
                                            <AccountFavoriteCocktailsPage />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/interactions/cocktail-ratings',
                                    element: (
                                        <React.Suspense>
                                            <AccountCocktailRatingsPage />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/interactions/notifications',
                                    element: (
                                        <React.Suspense>
                                            <AccountNotificationsPage />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/policies/terms-of-service',
                                    element: (
                                        <React.Suspense>
                                            <AccountTermsOfServicePage enableWidePadding={false} />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '/account/policies/privacy-policy',
                                    element: (
                                        <React.Suspense>
                                            <AccountPrivacyPolicyPage enableWidePadding={false} />
                                        </React.Suspense>
                                    )
                                },
                                {
                                    path: '*',
                                    element: <PathNotFound />
                                }
                            ]
                        },
                        {
                            path: '*',
                            element: <PathNotFound />
                        }
                    ]
                },
                {
                    path: '*',
                    element: <PathNotFound />
                }
            ]
        },
        {
            path: 'access_error',
            element: <AccessErrorComponent />
        }
    ],
    {
        basename: '/',

        future: {
            // v7_relativeSplatPath: true, // Enables relative paths in nested routes
            // v7_fetcherPersist: true, // Retains fetcher state during navigation
            // v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
            // v7_partialHydration: true, // Supports partial hydration for server-side rendering
            // v7_skipActionErrorRevalidation: true // Prevents revalidation when action errors occur
        }
    }
);

const App: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    const { ownedAccount } = useOwnedAccount();

    useEffect(() => {
        if (window.location.pathname === '/iam/auth/redirect') {
            return;
        }

        if (isAuthenticated === true && !ownedAccount) {
            loadOwnedAccountProfileData();
        }
    }, [isAuthenticated, ownedAccount]);

    return (
        <GlobalContext>
            <CssBaseline />
            <RouterProvider router={router} />
        </GlobalContext>
    );
};

export default App;
