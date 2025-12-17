import {
    Box,
    Button,
    Dialog,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { Project } from '../../types/project';
import ProjectForm from './ProjectForm';

export default function ProjectBoard() {
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    // Mock data - replace with actual data from props/state
    const projects: Project[] = [];

    const handleProjectClick = (projectId: number) => {
        // Navigation logic will be added
        console.log('Navigate to project:', projectId);
    };

    const handleCreateProject = (data: any) => {
        console.log('Create project:', data);
        setOpenCreateDialog(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ color: '#ff6b6b' }}>
                    Project List
                </Typography>
                <Button
                    variant="outlined"
                    onClick={() => setOpenCreateDialog(true)}
                    sx={{
                        borderColor: '#ff9800',
                        color: '#ff9800',
                        '&:hover': {
                            borderColor: '#f57c00',
                            bgcolor: 'rgba(255, 152, 0, 0.1)'
                        }
                    }}
                >
                    Create New
                </Button>
            </Box>

            {/* Project Table */}
            <TableContainer component={Paper} sx={{ border: '2px solid #ff6b6b' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>Done Tasks / Total Tasks</TableCell>
                            <TableCell sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>Due Date</TableCell>
                            <TableCell sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>Updated At</TableCell>
                            <TableCell sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>Archived</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => {
                            const doneTasks = project.tasks?.filter(t => t.status === 'DONE').length || 0;
                            const totalTasks = project.tasks?.length || 0;

                            return (
                                <TableRow
                                    key={project.id}
                                    onClick={() => handleProjectClick(project.id)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: 'rgba(255, 107, 107, 0.1)'
                                        }
                                    }}
                                >
                                    <TableCell sx={{ color: '#ff6b6b' }}>{project.title}</TableCell>
                                    <TableCell sx={{ color: '#ff6b6b' }}>{doneTasks} / {totalTasks}</TableCell>
                                    <TableCell sx={{ color: '#ff6b6b' }}>
                                        {new Date(project.dueDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell sx={{ color: '#ff6b6b' }}>
                                        {new Date(project.updatedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell sx={{ color: '#ff6b6b' }}>
                                        {project.isArchived ? 'Yes' : 'No'}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Create Project Dialog */}
            <Dialog
                open={openCreateDialog}
                onClose={() => setOpenCreateDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <ProjectForm
                    onSubmit={handleCreateProject}
                    onCancel={() => setOpenCreateDialog(false)}
                />
            </Dialog>
        </Box>
    );
}
