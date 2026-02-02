import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CocktailIngredientFilterChip from '../../atoms/CocktailIngredientFilterChip/CocktailIngredientFilterChip';
import CocktailFiltersLocalStorageService from '../../services/CocktailFiltersLocalStorageService';
import { IngredientFilterModel } from '../../api/cocktailsApi';

interface CocktailIngredientFilterChipGroupProps {
    title: string;
    filters: IngredientFilterModel[];
    onFiltersUpdated?: () => void;
}

const defaultAllOption: IngredientFilterModel = { id: 'all', name: '(All)' };

const CocktailIngredientFilterChipGroup = ({ title, filters, onFiltersUpdated }: CocktailIngredientFilterChipGroupProps) => {
    const filtersService = new CocktailFiltersLocalStorageService();
    const [anySelected, setAnySelected] = useState(filters.length === 0 ? false : filtersService.AnySelected(filters[0].id.substring(0, filters[0].id.indexOf('-'))));

    const allFilters = [...[defaultAllOption], ...filters];

    const handleClick = () => {
        setAnySelected(filters.length === 0 ? false : filtersService.AnySelected(filters[0].id.substring(0, filters[0].id.indexOf('-'))));

        if (onFiltersUpdated) {
            onFiltersUpdated();
        }
    };

    return (
        <>
            <Typography>{title}</Typography>
            <Box>
                {allFilters.map((x) => {
                    const isAllOption = x.id === defaultAllOption.id;

                    return (
                        <CocktailIngredientFilterChip
                            label={x.name}
                            id={x.id}
                            key={x.id}
                            selectionOverride={isAllOption ? !anySelected : undefined}
                            disabled={isAllOption && anySelected === true}
                            onClick={!isAllOption ? handleClick : undefined}
                        />
                    );
                })}
            </Box>
        </>
    );
};

export default CocktailIngredientFilterChipGroup;
