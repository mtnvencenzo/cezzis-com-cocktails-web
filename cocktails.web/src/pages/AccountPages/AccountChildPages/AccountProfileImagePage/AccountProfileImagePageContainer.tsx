import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Form } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { toast } from 'react-toastify';
import AccountAvatar from '../../../../molecules/AccountAvatar/AccountAvatar';
import { getOwnedAccountProfile, uploadProfileImage } from '../../../../services/AccountService';
import AccountProfileImageEditor from '../../../../organisims/AccountProfileImageEditor/AccountProfileImageEditor';
import { useOwnedAccount } from '../../../../components/OwnedAccountContext';
import theme from '../../../../theme';
import BackArrowLinkItem from '../../../../molecules/BackArrowLinkItem/BackArrowLinkItem';
import trimWhack from '../../../../utils/trimWhack';
import { getWindowEnv } from '../../../../utils/envConfig';
import startPageViewSpan from '../../../../services/Tracer';
import logger from '../../../../services/Logger';

const AccountProfileImagePageContainer = () => {
    const [editingAvatarFile, setEditingAvatarFile] = useState<File>();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const { ownedAccount } = useOwnedAccount();
    const isSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

    const handleAddImage = () => {
        inputFileRef.current!.click();
    };

    const resizeFile = async (file: File) =>
        new Promise((resolve) => {
            const quality = file.size > 1000000 ? 50 : 75;

            Resizer.imageFileResizer(
                file,
                700, // max width
                700, // max height
                'WEBP', // compress format
                quality, // quality
                0, // rotation
                (uri) => {
                    resolve(uri);
                },
                'file' // output type
            );
        });

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];

        if (file) {
            const resizedImage = (await resizeFile(file)) as File;

            try {
                setEditingAvatarFile(resizedImage);
            } finally {
                inputFileRef.current!.value = '';
            }
        }
    };

    const handleAvatarEditorClose = async (htmlCanvas: HTMLCanvasElement | undefined) => {
        if (htmlCanvas) {
            try {
                const blob = await (await fetch(htmlCanvas.toDataURL('image/webp'))).blob();
                const file = new File([blob], 'profile-image.webp', { type: 'image/webp' });

                await uploadProfileImage(file);
                await getOwnedAccountProfile(true);

                toast.success('Profile image updated!', { position: 'top-left' });
            } catch (error) {
                logger.logException('Failed to upload profile image', error as Error);
                toast.error('Unable to upload image. Please try again.', { position: 'top-left' });
            }
        }

        setEditingAvatarFile(undefined);
    };

    useEffect(() => {
        startPageViewSpan((span) => span.end());
    }, []);

    return (
        <>
            <title>Profile Center - Edit Avatar</title>
            <link rel='canonical' href={`${trimWhack(getWindowEnv().VITE_AUTH0_REDIRECT_URI)}/account/profile-center/avatar`} />
            <meta name='robots' content='noindex,follow' />

            {isSmOrXs && <BackArrowLinkItem />}

            <Grid
                container
                sx={{
                    pt: isSmOrXs ? '0px' : '40px',
                    pl: isSmOrXs ? '10px' : '0px',
                    pr: isSmOrXs ? '10px' : '0px',
                    pb: '40px',
                    mr: '0px'
                }}
            >
                <Grid size={12} sx={{ pt: '5px' }}>
                    <Typography variant='h6'>Profile Center</Typography>
                </Grid>
                <Grid id='profile-image' size={12} sx={{ pb: '50px' }}>
                    <Grid container sx={{ pt: '20px' }}>
                        <Grid size={12} sx={{ pb: '10px' }}>
                            <Typography variant='h6'>Edit Avatar</Typography>
                            <Divider />
                        </Grid>
                        <Grid size={12}>
                            <AccountAvatar onAddImage={handleAddImage} image={ownedAccount?.avatarUri ?? undefined} />
                            <Form>
                                <input
                                    type='file'
                                    ref={inputFileRef}
                                    onChange={handleFileChange}
                                    accept='image/*,image/heif,image/heic'
                                    style={{
                                        display: 'none'
                                    }}
                                />
                            </Form>
                        </Grid>
                        <AccountProfileImageEditor image={editingAvatarFile ?? ''} open={editingAvatarFile !== undefined} onClose={handleAvatarEditorClose} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AccountProfileImagePageContainer;
