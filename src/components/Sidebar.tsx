import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { handleLogout } from '../store/slices/authSlice';

export default function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const username = user?.name || user?.email || 'User';

    const onLogout = async () => {
        await dispatch(handleLogout());
        navigate('/login');
    };

    return (
        <Box
            sx={{
                width: 240,
                height: '100vh',
                borderRight: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                bgcolor: '#fafafa'
            }}
        >
            {/* User Profile Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <AccountCircleIcon sx={{ fontSize: 40, color: '#616161' }} />
                <Typography variant="body1" sx={{ color: '#424242' }}>{username}</Typography>
            </Box>

            <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />

            {/* Navigation Buttons */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/projects')}
                    sx={{
                        borderColor: '#757575',
                        color: '#424242',
                        '&:hover': {
                            borderColor: '#616161',
                            bgcolor: 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    Projects
                </Button>
            </Box>

            {/* Logout Button */}
            <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={onLogout}
                sx={{
                    borderColor: '#757575',
                    color: '#424242',
                    mt: 2,
                    mb: 3,
                    '&:hover': {
                        borderColor: '#616161',
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                    }
                }}
            >
                Logout
            </Button>
        </Box>
    );
}
