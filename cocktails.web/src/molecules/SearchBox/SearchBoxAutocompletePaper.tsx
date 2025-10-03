import Paper from '@mui/material/Paper';
import type { PaperProps } from '@mui/material/Paper';

const SearchBoxAutocompletePaper = (props: PaperProps) => {
    const { children } = props;

    return (
        <Paper {...props}>
            <hr color='#efefef' style={{ marginTop: '0px', marginBottom: '0px' }} />
            {children}
        </Paper>
    );
};

export default SearchBoxAutocompletePaper;
