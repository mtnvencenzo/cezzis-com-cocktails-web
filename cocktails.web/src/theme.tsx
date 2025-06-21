import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeDetails: Partial<ThemeOptions> = {
    typography: {
        fontFamily: 'Segoe UI, sans-serif'
    },
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 4,
                sx: {
                    maxWidth: '100%',
                    marginTop: '9px',
                    paddingTop: 'unset'
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    main: '#010101'
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#010101'
        },
        secondary: {
            main: '#f0f0f0'
        },
        background: {
            default: '#010101',
            paper: '#ffffff'
        }
    }
};

const theme = createTheme(themeDetails);

export default theme;
