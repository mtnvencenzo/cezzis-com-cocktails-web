import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface FooterLinkProps {
    text: string;
    navigatePath: string;
    testId: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const FooterLink = ({ text, navigatePath, testId, onClick = undefined }: FooterLinkProps) => (
    <Typography
        data-testid={testId}
        color='text.primary'
        component={Link}
        to={navigatePath}
        gutterBottom
        className='footerLink'
        onClick={onClick}
        sx={{
            fontSize: {
                xs: '14px',
                sm: '18px'
            }
        }}
    >
        {text}
    </Typography>
);

export default FooterLink;
