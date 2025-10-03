import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

const ImageButton = styled(ButtonBase)({
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: '50%',
    overflow: 'hidden'
});

interface AccountAvatarProps {
    image?: string;
    onAddImage: () => void;
}

const AccountAvatar = ({ image, onAddImage }: AccountAvatarProps) => (
    <ImageButton data-testid='btnChooseAccountAvatar' onClick={onAddImage}>
        <Avatar
            src={image}
            sx={{
                width: 150,
                height: 150
            }}
        />
        <Box
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 2,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, .5)'
            }}
        >
            <AddAPhotoOutlinedIcon style={{ color: '#fff' }} />
        </Box>
    </ImageButton>
);

export default AccountAvatar;
