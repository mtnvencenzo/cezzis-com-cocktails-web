import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import { PaperProps } from '@mui/material/Paper';
import Popper, { PopperProps } from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import NoDrinksIcon from '@mui/icons-material/NoDrinks';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { debounce } from '@mui/material/utils';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CocktailsListModel } from '../../api/cocktailsApi/cocktailsApiClient';
import { DEFAULT_TAKE, getCocktailsSearchResults } from '../../services/CocktailsService';
import Highlighted from '../../atoms/Highlighted/Highlighted';
import { useScreenContext } from '../../components/ScreenContext';
import SearchBoxAutocompletePaper from './SearchBoxAutocompletePaper';
import CocktailFiltersDialog from '../../organisims/CocktailFiltersDialog/CocktailFiltersDialog';
import { useCocktailSearch } from '../../components/CocktailSearchContext';
import { useCocktailFiltering } from '../../components/CocktailFilterContext';
import { CocktailModelOutput } from '../../api/aisearchApi';

interface SearchBoxProps {
    testId: string;
    enableFiltering?: boolean;
    bannerEmbeded?: boolean;
    replaceBreadcrumbOnSearch?: boolean;
    filterOptions?: boolean;
}

interface SearchState {
    value: NonNullable<string | CocktailsListModel | CocktailModelOutput> | null;
    inputValue: string;
    options: readonly CocktailsListModel[] | readonly CocktailModelOutput[];
    open: boolean;
    focused: boolean;
    hasRetrieved: boolean;
    preventOpen: boolean;
}

const GetCustomPaper = (props: PaperProps) => (
    <SearchBoxAutocompletePaper
        {...props}
        data-testid='searchbox-autocomplete-paper'
        sx={{
            border: '0px',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '3px',
            borderBottomRightRadius: '3px',
            boxShadow: 'none',
            position: 'relative',
            top: '-2px',
            borderTop: '0px',
            paddingTop: '0px',
            paddingLeft: '0px !important',
            margin: '0px !important',
            width: '100% !important'
        }}
    />
);

const GetCustomPopper = (props: PopperProps) => {
    const anchorEl = document.getElementsByClassName('MuiAutocomplete-root')[0];
    return (
        <Popper
            {...props}
            anchorEl={anchorEl}
            style={{
                width: `${anchorEl!.clientWidth} !important`,
                margin: '0px'
            }}
            sx={{
                width: {
                    lg: '800px',
                    md: '600px',
                    sm: '100%',
                    xs: '100%'
                },
                margin: '0px'
            }}
            placement='bottom-start'
        />
    );
};

const filter = createFilterOptions<NonNullable<string | CocktailsListModel | CocktailModelOutput> | null>();
const retrievingOptionsText = 'Retrieving Cocktails List...';
const noOptionsText = 'No matches found. Try reducing your search filters and search term';

const SearchBox = ({ testId, enableFiltering = false, bannerEmbeded = false, replaceBreadcrumbOnSearch = false, filterOptions = true }: SearchBoxProps) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const screenContext = useScreenContext();
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));
    const { setNoItems } = useCocktailSearch();
    const { filtersRevision } = useCocktailFiltering();
    const [searchParams] = useSearchParams();
    const textFieldRef = useRef<HTMLInputElement>(null);
    const [searchState, setSearchState] = useState<SearchState>({
        value: null,
        inputValue: searchParams.get('q') ?? '',
        options: [],
        open: false,
        focused: false,
        hasRetrieved: false,
        preventOpen: false
    });

    // used to disable a search after selecting an item in the list to navigate to.
    const [isNavigating, setIsNavigating] = useState<boolean>(false);

    const closePopup = (preventOpen?: boolean) => {
        if (screenContext.isFullScreenMode) {
            screenContext.setIsFullScreenMode!(false);
        }

        setSearchState((prevState) => ({
            ...prevState,
            focused: false,
            open: false,
            preventOpen: preventOpen ?? prevState.preventOpen
        }));
    };

    const handleSearchClick = (e: React.SyntheticEvent<Element, Event> | React.KeyboardEvent<Element | Event>) => {
        e.preventDefault();

        navigate(`/cocktails/search?q=${searchState.inputValue}`, { replace: replaceBreadcrumbOnSearch });
        closePopup(true);
        textFieldRef.current?.blur();
    };

    const handleKeyDown = (event: React.KeyboardEvent<Element>) => {
        if (event.key === 'Escape') {
            setSearchState((prevState) => ({
                ...prevState,
                value: null,
                inputValue: ''
            }));
        } else if (event.key === 'Enter') {
            handleSearchClick(event);
        }
    };

    const handleFilterDialogOpening = () => {
        setSearchState((prevState) => ({
            ...prevState,
            preventOpen: true
        }));
    };

    const handleFilterDialogClosing = () => {
        setSearchState((prevState) => ({
            ...prevState,
            preventOpen: false
        }));
    };

    const handleOpen = () => {
        // dont popup if filters box is opening.
        setSearchState((prevState) => ({
            ...prevState,
            open: prevState.open !== true && (enableFiltering || prevState.options.length > 0)
        }));
    };

    const handleFocus = (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();

        if (isSmOrXs && !screenContext.isFullScreenMode) {
            screenContext.setIsFullScreenMode!(true);
        }

        if (!searchState.focused) {
            setSearchState((prevState) => ({
                ...prevState,
                focused: true,
                preventOpen: false
            }));
        }
    };

    const handleBlur = (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();

        if (searchState.focused) {
            setSearchState((prevState) => ({
                ...prevState,
                focused: isSmOrXs && screenContext.isFullScreenMode ? prevState.focused : false,
                open: isSmOrXs && screenContext.isFullScreenMode ? prevState.open : false
            }));
        }
    };

    const handleClose = (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();

        if (searchState.open && !searchState.focused) {
            setSearchState((prevState) => ({
                ...prevState,
                open: prevState.inputValue.length !== 0
            }));
        }
    };

    const handleInputChange = (_: React.SyntheticEvent<Element, Event>, newInputValue: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            inputValue: newInputValue,
            open: enableFiltering || prevState.options.length > 0,
            focused: true,
            preventOpen: false
        }));
    };

    const handleOnChange = (_: React.SyntheticEvent<Element, Event>, v: string | CocktailsListModel | CocktailModelOutput | null) => {
        setSearchState((prevState) => ({
            ...prevState,
            value: v
        }));

        if (typeof v !== 'string' && v?.id) {
            setIsNavigating(true);
            navigate(`/cocktails/${v.id}`);

            if (screenContext.isFullScreenMode) {
                screenContext.setIsFullScreenMode!(false);
            }
        }
    };

    const handleSearchBackArrowClick = (e?: React.SyntheticEvent<Element, Event>) => {
        e?.preventDefault();
        closePopup();
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    const fetchSearchResults = React.useMemo(
        () =>
            debounce((freeText: string, skip: number, take: number, callback: (results?: readonly CocktailModelOutput[]) => void) => {
                getCocktailsSearchResults(callback, freeText, skip, take);
            }, 400),
        [filtersRevision]
    );

    useEffect(() => {
        if (screenContext.isFullScreenMode) {
            screenContext.setIsFullScreenMode!(false);
        }

        return () => {
            if (screenContext.isFullScreenMode) {
                screenContext.setIsFullScreenMode!(false);
            }
        };
    }, []);
    /* eslint-enable react-hooks/exhaustive-deps */

    useEffect(() => {
        let active = true;

        if (!isNavigating) {
            fetchSearchResults(searchState.inputValue, 0, DEFAULT_TAKE, (results?: readonly CocktailModelOutput[]) => {
                if (active) {
                    if (results) {
                        setNoItems(results.length === 0);

                        setSearchState((prevState) => ({
                            ...prevState,
                            options: results,
                            open: (enableFiltering || results.length > 0) && prevState.focused,
                            hasRetrieved: true
                        }));
                    }
                }
            });
        }

        return () => {
            active = false;
        };
    }, [searchState.value, searchState.inputValue, fetchSearchResults, enableFiltering, setNoItems, searchState.preventOpen, isNavigating]);

    const isEqualValue = (option: NonNullable<string | CocktailsListModel | CocktailModelOutput> | null, value: NonNullable<string | CocktailsListModel | CocktailModelOutput> | null): boolean =>
        /* eslint-disable no-nested-ternary */
        typeof option === 'string' && typeof value === 'string'
            ? option === value
            : typeof option === 'string' && typeof value !== 'string'
              ? option === value?.title
              : typeof option !== 'string' && typeof value !== 'string'
                ? option?.id === value?.id
                : false;
    /* eslint-enable no-nested-ternary */

    const autoCompleteSxProps =
        bannerEmbeded && isSmOrXs && searchState.focused
            ? {
                  position: 'absolute !important',
                  top: '0px !important',
                  left: '0px !important',
                  zIndex: 999
              }
            : {};

    const iconArrowSxProps =
        bannerEmbeded && isSmOrXs && searchState.focused
            ? {
                  paddingTop: '0px !important',
                  top: 11
              }
            : {};

    return (
        <>
            {screenContext.isFullScreenMode && (
                <IconButton
                    onClick={handleSearchBackArrowClick}
                    sx={{
                        ...iconArrowSxProps,
                        paddingRight: '0px !important',
                        paddingLeft: '0px !important',
                        position: 'absolute',
                        zIndex: 1000,
                        left: 10
                    }}
                >
                    <ArrowBackIosIcon color='primary' fontSize='small' />
                </IconButton>
            )}

            <Autocomplete
                key='global-search-box'
                id='global-search-box'
                data-testid={testId}
                sx={{
                    ...autoCompleteSxProps,
                    width: {
                        lg: '800px',
                        md: '600px',
                        sm: '100%',
                        xs: '100%'
                    }
                }}
                autoFocus={false}
                PaperComponent={GetCustomPaper}
                PopperComponent={GetCustomPopper}
                getOptionLabel={(option) => (typeof option === 'string' ? option : (option?.title ?? ''))}
                options={searchState.options}
                handleHomeEndKeys
                filterOptions={(options, params) => {
                    const filtered = filterOptions ? filter(options, params) : options;

                    if (enableFiltering) {
                        if (!searchState.hasRetrieved) {
                            filtered.push(retrievingOptionsText);
                        } else if (!options || options.length === 0) {
                            filtered.push(noOptionsText);
                        }
                    }

                    return filtered;
                }}
                autoComplete
                freeSolo
                disableClearable={searchState.value !== null}
                value={searchState.value}
                isOptionEqualToValue={(o, value) => isEqualValue(o, value)}
                open={!searchState.preventOpen && searchState.open}
                onOpen={handleOpen}
                onClose={handleClose}
                inputValue={searchState.inputValue}
                inputMode='search'
                onChange={handleOnChange}
                onBlur={handleBlur}
                ListboxProps={{
                    sx: {
                        maxHeight: {
                            lg: '60vh',
                            md: '60vh',
                            sm: screenContext.isFullScreenMode ? '88vh' : '40vh',
                            xs: screenContext.isFullScreenMode ? '88vh' : '40vh'
                        }
                    }
                }}
                onInputChange={handleInputChange}
                // no-nested-ternary
                renderOption={(props: React.HTMLAttributes<HTMLLIElement>, option: NonNullable<string | CocktailsListModel | CocktailModelOutput> | null) => {
                    if (typeof option === 'string') {
                        if (option === retrievingOptionsText) {
                            return (
                                <ListItem
                                    {...props}
                                    key={option}
                                    sx={{
                                        display: 'list-item !important',
                                        paddingTop: '1px',
                                        paddingBottom: '1px'
                                    }}
                                >
                                    <Stack spacing={2} direction='row' alignItems='center'>
                                        <CircularProgress size='20px' />
                                        <Typography>{option}</Typography>
                                    </Stack>
                                </ListItem>
                            );
                        }
                        return (
                            <ListItem
                                {...props}
                                key={option}
                                sx={{
                                    display: 'list-item !important',
                                    paddingTop: '1px',
                                    paddingBottom: '1px'
                                }}
                            >
                                <Stack spacing={2} direction='row' alignItems='center'>
                                    <NoDrinksIcon sx={{ color: '#cfcfcf' }} />
                                    <Typography>{option}</Typography>
                                </Stack>
                            </ListItem>
                        );
                    }
                    return (
                        <ListItem
                            {...props}
                            key={option?.id}
                            sx={{
                                display: 'list-item !important',
                                paddingTop: '1px',
                                paddingBottom: '1px'
                            }}
                        >
                            <Highlighted testId={option?.id} text={option?.title ?? ''} highlight={searchState.inputValue} to={`/cocktails/${option?.id ?? ''}`} />

                            {option?.isIba ? (
                                <Chip
                                    label='IBA'
                                    size='small'
                                    sx={{
                                        marginLeft: '5px',
                                        marginBottom: '3px',
                                        backgroundColor: '#e8f7fd'
                                    }}
                                />
                            ) : (
                                ''
                            )}

                            {option?.ingredients ? (
                                <Box sx={{ paddingLeft: '20px', paddingBottom: '5px' }}>
                                    <Typography component={Link} sx={{ fontStyle: 'italic', color: '#acacac', textDecoration: 'none' }} to={`/cocktails/${option?.id ?? ''}`}>
                                        {option?.ingredients.map((i) => i.display).join(', ')}
                                    </Typography>
                                </Box>
                            ) : (
                                ''
                            )}
                        </ListItem>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        inputRef={textFieldRef}
                        key='search-text-input-key'
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                type: 'search',
                                placeholder: 'Search cocktails...',
                                startAdornment: (
                                    <InputAdornment
                                        position='start'
                                        data-testid='filter-iconbutton'
                                        sx={{
                                            paddingLeft: '0px !important',
                                            backgroundColor: 'primary.secondary'
                                        }}
                                    >
                                        <CocktailFiltersDialog
                                            onOpening={handleFilterDialogOpening}
                                            onClosing={handleFilterDialogClosing}
                                            testId='cocktail-search-filters'
                                            enablePulsate={searchState.hasRetrieved}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment
                                        position='end'
                                        data-testid='search-iconbutton'
                                        sx={{
                                            paddingLeft: '0px !important'
                                        }}
                                    >
                                        <IconButton
                                            sx={{
                                                paddingLeft: '0px !important'
                                            }}
                                            onMouseDownCapture={handleSearchClick}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                background: 'white',
                                boxShadow: 'none',
                                paddingTop: '1px',
                                paddingBottom: '1px'
                            },
                            '& .MuiAutocomplete-inputRoot': {
                                paddingLeft: screenContext.isFullScreenMode ? '35px !important' : '5px !important',
                                paddingRight: '0px !important',
                                borderColor: '#efefef',
                                boxShadow: 'none'
                            },
                            '& .MuiInputLabel-outlined': {
                                paddingLeft: '20px',
                                boxShadow: 'none',
                                paddingTop: '1px',
                                paddingBottom: '1px'
                            },
                            '& .MuiInputLabel-shrink': {
                                marginLeft: '20px',
                                paddingLeft: '10px',
                                paddingRight: 0,
                                visibility: 'hidden'
                            },
                            '& .MuiAutocomplete-inputRoot[class*="Mui-focused"]': {
                                borderColor: '#efefef',
                                boxShadow: 'none',
                                borderBottom: '1px solid #ffffff',
                                paddingTop: '1px',
                                paddingBottom: '1px'
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#efefef',
                                boxShadow: 'none',
                                borderBottom: '1px solid #ffffff !important',
                                paddingTop: '1px',
                                paddingBottom: '1px'
                            },
                            '& .MuiOutlinedInput-root:hover': {
                                '& > fieldset': {
                                    borderColor: '#efefef',
                                    boxShadow: 'none',
                                    paddingTop: '1px',
                                    paddingBottom: '1px'
                                }
                            }
                        }}
                    />
                )}
            />
        </>
    );
};

export default SearchBox;
