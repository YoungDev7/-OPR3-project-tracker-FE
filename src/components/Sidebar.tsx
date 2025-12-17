import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    const username = "username"; // Replace with actual username from state/props

    return (
        <Box
            sx={{
                width: 200,
                height: '100vh',
                borderRight: '2px solid #ff6b6b',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                bgcolor: '#fff'
            }}
        >
            {/* User Profile Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <AccountCircleIcon sx={{ fontSize: 40, color: '#ff6b6b' }} />
                <Typography variant="body1">{username}</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Navigation Buttons */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/projects')}
                    sx={{
                        borderColor: '#ff9800',
                        color: '#ff9800',
                        '&:hover': {
                            borderColor: '#f57c00',
                            bgcolor: 'rgba(255, 152, 0, 0.1)'
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
                onClick={() => {/* Logout logic */ }}
                sx={{
                    borderColor: '#ff9800',
                    color: '#ff9800',
                    '&:hover': {
                        borderColor: '#f57c00',
                        bgcolor: 'rgba(255, 152, 0, 0.1)'
                    }
                }}
            >
                Logout
            </Button>
        </Box>
    );
}
