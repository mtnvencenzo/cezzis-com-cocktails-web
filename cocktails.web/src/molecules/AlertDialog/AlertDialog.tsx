import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Typography } from '@mui/material';
import logo from '../../assets/logo-42x42.png';

interface AlertDialogProps {
    open: boolean;
    title: string;
    content: string;
    cancelButtonText: string;
    confirmButtonText: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    children?: React.ReactNode;
    showConfirm?: boolean;
}

const AlertDialog = ({ children, open, title, content, cancelButtonText, confirmButtonText, onCancel = undefined, onConfirm = undefined, showConfirm = true }: AlertDialogProps) => {
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
    };

    return (
        <Dialog open={open} onClose={handleCancel} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
            <DialogContent>
                <Grid container>
                    <Grid size={1}>
                        <Box
                            component='img'
                            sx={{
                                display: 'inline-block',
                                mr: 3,
                                pt: '0px',
                                pb: '5px',
                                height: '42px',
                                width: '42px'
                            }}
                            src={logo}
                        />
                    </Grid>
                    <Grid size={11}>
                        <Typography variant='h6' component='span' sx={{ display: 'inline-block', pb: '15px', pl: { xs: '25px', sm: '10px' } }}>
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
                <DialogContentText id='alert-dialog-description' sx={{ pl: '10px' }}>
                    {content}
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>{cancelButtonText}</Button>
                {showConfirm && (
                    <Button onClick={handleConfirm} autoFocus>
                        {confirmButtonText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
