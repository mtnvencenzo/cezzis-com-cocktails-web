import { Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { escapeRegExp } from 'lodash';
import { Link } from 'react-router-dom';

export const removeDiacritics = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const Highlighted = ({ testId = '', text = '', highlight = '', to = '' }) => {
    if (!highlight.trim()) {
        return (
            <Typography data-testid={testId} component={Link} color='primary' to={to} style={{ textDecoration: 'none' }}>
                <span>{text}</span>
            </Typography>
        );
    }

    const regex = new RegExp(`(${escapeRegExp(removeDiacritics(highlight))})`, 'gi');
    const parts = text.split(regex);

    return (
        <Typography data-testid={testId} component={Link} color='primary' to={to} style={{ textDecoration: 'none' }}>
            {
                // eslint-disable-next-line react/no-array-index-key
                parts.filter((part) => part).map((part, v) => (regex.test(removeDiacritics(part)) ? <b key={v}>{part}</b> : <span key={v}>{part}</span>))
            }
        </Typography>
    );
};

export default Highlighted;
