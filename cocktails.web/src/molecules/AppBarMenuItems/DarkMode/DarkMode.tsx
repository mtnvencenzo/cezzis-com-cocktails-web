import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
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
