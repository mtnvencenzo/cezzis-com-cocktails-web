import { useEffect, useRef, useState } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Stack, useMediaQuery, useTheme } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';

interface AccountProfileImageEditorProps {
    image: string | File;
    open: boolean;
    onClose: (imageCanvas: HTMLCanvasElement | undefined) => void;
}

const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const SCROLL_SENSITIVITY = 0.02;
const MIN_ZOOM = 10;
const MAX_ZOOM = 50;

const AccountProfileImageEditor = ({ image, open, onClose }: AccountProfileImageEditorProps) => {
    const editor = useRef<AvatarEditor>(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [slideValue, setSlideValue] = useState<number>(10);
    const [saving, setSaving] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClose = (save: boolean) => {
        if (editor && editor.current) {
            if (save) {
                setSaving(true);
                onClose(editor.current.getImageScaledToCanvas());
                setSaving(false);
            } else {
                onClose(undefined);
            }
        }
    };

    useEffect(() => {
        const element = containerRef.current;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const delta = -e.deltaY * SCROLL_SENSITIVITY; // Adjust sensitivity as needed
            setSlideValue((prev) => {
                let newZoom = prev + delta;
                newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
                return newZoom;
            });
        };

        if (element) {
            element.removeEventListener('wheel', handleWheel);
            element.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (element) {
                element.removeEventListener('wheel', handleWheel);
            }
        };
    }, [open]);

    return (
        <Dialog disablePortal fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
            <DialogTitle id='responsive-dialog-title'>Upload your profile picture</DialogTitle>
            <DialogContent sx={modalStyle}>
                <Stack ref={containerRef} direction='column' spacing={2}>
                    <AvatarEditor
                        ref={editor}
                        image={image}
                        style={{ width: '100%', height: '100%' }}
                        crossOrigin='anonymous'
                        border={50}
                        borderRadius={150}
                        color={[0, 0, 0, 0.72]}
                        scale={slideValue / 10}
                        rotate={0}
                    />
                    <Slider
                        size='small'
                        min={10}
                        max={50}
                        defaultValue={slideValue}
                        value={slideValue}
                        aria-label='Small'
                        valueLabelDisplay='auto'
                        onChange={(_: Event, newValue: number | number[]) => setSlideValue(newValue as number)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => handleClose(false)}>
                    Cancel
                </Button>
                {saving && <CircularProgress size='30px' />}
                <Button data-testid='btnSaveAvatar' onClick={() => handleClose(true)} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AccountProfileImageEditor;
