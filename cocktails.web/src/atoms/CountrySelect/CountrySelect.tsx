import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { countries } from 'countries-list';
import firstOrDefault from '../../utils/firstOrDefault';

const countryOptions = Object.values(countries).map<string>((x) => x.name);

interface CountrySelectProps {
    onChange: (value: string | null) => void;
    value: string | null;
}

const CountrySelect = ({ onChange, value }: CountrySelectProps) => {
    const propValue = typeof value === 'string' ? firstOrDefault(countryOptions, (x) => x.toLocaleLowerCase() === value?.toLocaleLowerCase(), null) : value;

    const [country, setCountry] = useState<string | null>(propValue);

    const handleChange = (_: React.SyntheticEvent<Element, Event>, v: string | null) => {
        setCountry(v);
        onChange(v);
    };

    const handleInputChange = (_: React.SyntheticEvent<Element, Event>, v: string | null) => {
        const inputValue = firstOrDefault(countryOptions, (x) => x.toLocaleLowerCase() === v?.toLocaleLowerCase(), null);

        if (inputValue) {
            setCountry(inputValue);
            onChange(inputValue);
        }
    };

    return (
        <Autocomplete
            autoSelect
            freeSolo
            autoComplete
            options={countryOptions}
            isOptionEqualToValue={(option, value) => option?.toLocaleLowerCase() === value?.toLocaleLowerCase()}
            getOptionLabel={(option) => option}
            value={country}
            onChange={handleChange}
            onInputChange={handleInputChange}
            renderInput={(params) => <TextField {...params} data-testid='ddlCountry' sx={{ mb: '30px' }} autoComplete='country-name' label='Country' variant='standard' />}
        />
    );
};

export default CountrySelect;
