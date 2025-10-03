import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { cloneElement, MouseEventHandler } from 'react';
// import { Link } from 'react-router-dom';
import './ProfileSettingItemLink.css';
import { Link } from 'react-router-dom';

interface ProfileSettingItemLinkProps {
    text: string;
    icon: React.ReactElement;
    navigatePath: string;
    testId: string;
    onClick?: MouseEventHandler<HTMLElement>;
}

const props = {
    fontSize: 'small',
    sx: {
        verticalAlign: 'text-top',
        pr: '8px',
        pb: '2px'
    }
};

const ProfileSettingItemLink = ({ text, icon, navigatePath, testId, onClick }: ProfileSettingItemLinkProps) => (
    <Box>
        {onClick && (
            <Typography component={Link} to={navigatePath} onClick={(e) => onClick(e)} noWrap data-testid={testId} sx={{ color: 'text.secondary', fontSize: 16 }}>
                {cloneElement(icon, { ...props })}
                {text}
            </Typography>
        )}
        {!onClick && (
            <Typography component={Link} to={navigatePath} noWrap data-testid={testId} sx={{ color: 'text.secondary', fontSize: 16 }}>
                {cloneElement(icon, { ...props })}
                {text}
            </Typography>
        )}
    </Box>
);

export default ProfileSettingItemLink;
