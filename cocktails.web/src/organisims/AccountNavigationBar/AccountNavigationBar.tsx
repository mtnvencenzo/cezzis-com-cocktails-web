import { Box, Card, CardContent, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import BadgeIcon from '@mui/icons-material/Badge';
import FaceIcon from '@mui/icons-material/Face';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GradeIcon from '@mui/icons-material/Grade';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import NightlightIcon from '@mui/icons-material/Nightlight';
import CookieIcon from '@mui/icons-material/Cookie';
import ArticleIcon from '@mui/icons-material/Article';
import MailLockIcon from '@mui/icons-material/MailLock';
import ProfileSettingItemLink from '../../atoms/ProfileSettingItemLink/ProfileSettingItemLink';
import showCookieBot from '../../utils/cookiebot';

interface AccountNavigationBarProps {
    testId: string;
    fullScreen: boolean;
}

const AccountNavigationBar = ({ testId, fullScreen = false }: AccountNavigationBarProps) => (
    <Box sx={{ maxWidth: fullScreen ? '100%' : '300px', minWidth: fullScreen ? '100%' : '200px' }}>
        <Box data-testid={testId} sx={{ pt: '5px' }}>
            <Typography variant='h6'>Profile &amp; Settings</Typography>
        </Box>
        <Box>
            <Card variant='outlined' sx={{ borderRadius: '10px' }}>
                <CardContent>
                    <Typography component='div'>
                        <b>Profile Center</b>
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                        Manage your Cezzis.com profile and security settings across all of your devices.
                    </Typography>
                    <ProfileSettingItemLink icon={<PersonIcon />} text='Personal details' testId='p-settings-personal-details' navigatePath='/account/profile-center/personal-details' />
                    <ProfileSettingItemLink icon={<FaceIcon />} text='Profile Image' testId='p-settings-profile-image' navigatePath='/account/profile-center/avatar' />
                    <ProfileSettingItemLink icon={<NightlightIcon />} text='Display & accessibility' testId='p-settings-accessibility' navigatePath='/account/profile-center/accessibility' />
                </CardContent>
            </Card>
        </Box>
        <Box sx={{ mt: '20px' }}>
            <Card variant='outlined' sx={{ borderRadius: '10px' }}>
                <CardContent>
                    <Typography component='div'>
                        <b>Interactions</b>
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                        View and manage your interactions with content on Cezzis.com.
                    </Typography>
                    <ProfileSettingItemLink icon={<FavoriteIcon />} text='Favorite Cocktail Recipes' testId='p-settings-favorite-cocktails' navigatePath='/account/interactions/favorite-cocktails' />
                    <ProfileSettingItemLink icon={<GradeIcon />} text='My Cocktail Ratings' testId='p-settings-my-ratings' navigatePath='/account/interactions/cocktail-ratings' />
                    <ProfileSettingItemLink icon={<NotificationsIcon />} text='Notification Settings' testId='p-settings-notifications' navigatePath='/account/interactions/notifications' />
                </CardContent>
            </Card>
        </Box>
        <Box sx={{ mt: '20px' }}>
            <Card variant='outlined' sx={{ borderRadius: '10px' }}>
                <CardContent>
                    <Typography component='div'>
                        <b>Account / Security</b>
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                        Modify and update your account security settings and preferences.
                    </Typography>
                    <ProfileSettingItemLink icon={<MailLockIcon />} text='Change Email' testId='p-settings-email' navigatePath='/account/profile-center/change-email' />
                    <ProfileSettingItemLink icon={<SecurityIcon />} text='Change Password' testId='p-settings-password' navigatePath='/account/profile-center/change-password' onClick={() => {}} />
                    <ProfileSettingItemLink icon={<BadgeIcon />} text='Change Username' testId='p-settings-username' navigatePath='/account/profile-center/change-username' onClick={() => {}} />
                </CardContent>
            </Card>
        </Box>
        <Box sx={{ mt: '20px' }}>
            <Card variant='outlined' sx={{ borderRadius: '10px' }}>
                <CardContent>
                    <Typography component='div'>
                        <b>Community Starndards and Policies</b>
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                        Read the policies and standards in place while navigating and interacting on Cezzis.com.
                    </Typography>
                    <ProfileSettingItemLink icon={<ArticleIcon />} text='Terms of Service' testId='p-settings-terms' navigatePath='/account/policies/terms-of-service' />
                    <ProfileSettingItemLink icon={<LockPersonIcon />} text='Privacy Policy' testId='p-settings-privacy' navigatePath='/account/policies/privacy-policy' />
                    <ProfileSettingItemLink icon={<CookieIcon />} text='Cookie Preferences' testId='p-settings-coockies' navigatePath='#' onClick={(e) => showCookieBot(e)} />
                </CardContent>
            </Card>
        </Box>
    </Box>
);

export default AccountNavigationBar;
