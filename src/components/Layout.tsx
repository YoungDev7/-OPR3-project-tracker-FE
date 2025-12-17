import { Box } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: '#f5f5f5' }}>
      <Box sx={{ flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        ml: 4,
        mr: 4,
        overflow: 'auto'
      }}>
        {children}
      </Box>
    </Box>
  );
}
