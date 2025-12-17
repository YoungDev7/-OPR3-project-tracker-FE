import { Box } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', p: { xs: 0, md: 2 }, gap: { xs: 0, md: 2 }, boxSizing: 'border-box' }}>
      <Box sx={{ width: '30vw', flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box sx={{
        width: { xs: '100vw', md: '70vw' },
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        p: { xs: 1, md: 0 }
      }}>
        {children}
      </Box>
    </Box>
  );
}
