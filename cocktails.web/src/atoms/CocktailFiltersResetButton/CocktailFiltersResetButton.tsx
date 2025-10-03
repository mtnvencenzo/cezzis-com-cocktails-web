import Button from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';
import CocktailFiltersLocalStorageService from '../../services/CocktailFiltersLocalStorageService';

const filtersStorageService = new CocktailFiltersLocalStorageService();

interface CocktailFiltersResetButtonProps {
    testId: string;
    disabled?: boolean;
    onReset?: () => void;
    sx?: SxProps<Theme>;
}

const CocktailFiltersResetButton = ({ testId, disabled = false, onReset, sx }: CocktailFiltersResetButtonProps) => {
    const handleReset = () => {
        filtersStorageService.ClearAllSelections();

        if (onReset) {
            onReset();
        }
    };

    return (
        <Button data-testid={testId} variant='outlined' color='primary' disabled={disabled} onClick={handleReset} sx={sx}>
            Reset All Filters
        </Button>
    );
};

export default CocktailFiltersResetButton;
