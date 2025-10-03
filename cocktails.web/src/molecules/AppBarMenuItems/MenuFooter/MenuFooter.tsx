import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import MenuLink from '../../../atoms/MenuLink/MenuLink';
import showCookieBot from '../../../utils/cookiebot';

const MenuFooter = () => (
    <MenuItem>
        <Typography fontSize={14} sx={{ pl: '2px', pt: '10px', color: '#888888' }}>
            <MenuLink text='Privacy' testId='m-link-privacy' navigatePath='/privacy-policy' /> ·&nbsp;
            <MenuLink text='Terms of Service' testId='m-link-terms' navigatePath='/terms-of-service' /> ·&nbsp;
            <MenuLink text='Cookies' testId='m-link-cookies' navigatePath='#' onClick={(e) => showCookieBot(e)} /> <br />
            Cezzis.Com &copy; {new Date().getFullYear()}
        </Typography>
    </MenuItem>
);

export default MenuFooter;
