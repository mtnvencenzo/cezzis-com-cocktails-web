import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import CocktailFiltersLocalStorageService from '../../services/CocktailFiltersLocalStorageService';

export interface CocktailIngredientFilterChipEventArgs {
    selected: boolean;
}

interface CocktailIngredientFilterChipProps {
    id: string;
    label: string;
    disabled?: boolean;
    onClick?: (args: CocktailIngredientFilterChipEventArgs) => void;
    selectionOverride?: boolean;
}

const filtersService = new CocktailFiltersLocalStorageService();

const CocktailIngredientFilterChip = React.memo(({ id, label, disabled, onClick, selectionOverride }: CocktailIngredientFilterChipProps) => {
    const [selected, setSelected] = useState(filtersService.IsSelected(id));

    const handleClick = () => {
        setSelected((prevSelected) => {
            filtersService.SetSelected(id, !prevSelected);
            return !prevSelected;
        });

        if (onClick) {
            onClick({ selected });
        }
    };

    return (
        <Chip
            label={label}
            size='small'
            key={id}
            sx={{
                marginRight: '2px'
            }}
            disabled={disabled}
            color={(selectionOverride ?? selected) ? 'primary' : 'secondary'}
            onClick={handleClick}
        />
    );
});

CocktailIngredientFilterChip.displayName = 'CocktailIngredientFilterChip';
export default CocktailIngredientFilterChip;
