import { Grid, MenuItem, Typography } from '@mui/material';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useNavigate } from 'react-router-dom';

interface AccessibilitySettingsProps {
    testId: string;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const AccessibilitySettings = ({ setAnchorEl, testId }: AccessibilitySettingsProps) => {
    const navigate = useNavigate();

    const handleCloseUserMenu = async () => {
        setAnchorEl(null);

        navigate('/account/profile-center/accessibility');
    };

    return (
        <MenuItem onClick={handleCloseUserMenu} data-testid={testId}>
            <NightlightIcon />
            <Grid container width='100%' paddingRight='0px' marginRight='0px'>
                <Grid>
                    <Typography textAlign='left' paddingLeft='10px'>
                        Display & accessibility
                    </Typography>
                </Grid>
            </Grid>
        </MenuItem>
    );
};

export default AccessibilitySettings;
