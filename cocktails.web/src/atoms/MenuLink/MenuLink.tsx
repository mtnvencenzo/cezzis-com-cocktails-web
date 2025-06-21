import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface MenuLinkProps {
    text: string;
    navigatePath: string;
    testId: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const MenuLink = ({ text, navigatePath, testId, onClick = undefined }: MenuLinkProps) => (
    <Typography data-testid={testId} color='text.primary' component={Link} to={navigatePath} noWrap gutterBottom className='menuLink' onClick={onClick}>
        {text}
    </Typography>
);

export default MenuLink;
