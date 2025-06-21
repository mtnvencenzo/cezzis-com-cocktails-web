import { Paper, PaperProps } from '@mui/material';

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
