import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import theme from '../../theme';

interface BackArrowLinkItemProps {
    navigateTo?: string;
    text?: string;
    icon?: React.ReactNode;
}

const BackArrowLinkItem = ({ navigateTo = '/account/settings', text = 'Back to Account Settings', icon = <ArrowBackIosIcon color='secondary' fontSize='small' /> }: BackArrowLinkItemProps) => {
    const navigate = useNavigate();

    const handleBackArrowClick = (e?: React.SyntheticEvent<Element, Event>) => {
        e?.preventDefault();
        navigate(navigateTo);
    };

    return (
        <Grid container sx={{ backgroundColor: theme.palette.background.default }}>
            <IconButton color='secondary' disableRipple onClick={handleBackArrowClick}>
                {icon}
                <Typography color='secondary'>{text}</Typography>
            </IconButton>
        </Grid>
    );
};

export default BackArrowLinkItem;
