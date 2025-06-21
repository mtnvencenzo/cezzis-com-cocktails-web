import { Grid, MenuItem, Switch, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface DarkModeProps {
    testId: string;
    defaultChecked: boolean;
}

const DarkMode = ({ testId, defaultChecked }: DarkModeProps) => (
    <MenuItem disableRipple data-testid={testId}>
        <DarkModeIcon />
        <Grid container width='100%' paddingRight='0px' marginRight='0px'>
            <Grid>
                <Typography textAlign='left' paddingLeft='10px'>
                    Dark Mode
                </Typography>
            </Grid>
            <Grid alignContent='flex-start' alignItems='flex-end' margin='auto' paddingRight='0px' marginRight='0px'>
                <Switch defaultChecked={defaultChecked} sx={{ marginRight: '0px' }} />
            </Grid>
        </Grid>
    </MenuItem>
);

export default DarkMode;
