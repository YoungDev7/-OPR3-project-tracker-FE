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
import TaskForm from '../tasks/TaskForm';
import ProjectForm from './ProjectForm';

interface ProjectViewProps {
    project?: Project;
}

export default function ProjectView({ project }: ProjectViewProps) {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false);

    const handleEditProject = (data: any) => {
        console.log('Edit project:', data);
        setOpenEditDialog(false);
    };

    const handleCreateTask = (data: any) => {
        console.log('Create task:', data);
        setOpenCreateTaskDialog(false);
    };

    const handleTaskClick = (taskId: number) => {
        // Navigation logic will be added
        console.log('Navigate to task:', taskId);
    };

    if (!project) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>No project selected</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Project Title */}
            <Typography variant="h4" sx={{ color: '#ff6b6b', mb: 3 }}>
                {project.title}
            </Typography>

            {/* Description Box */}
            <Paper
                sx={{
                    p: 2,
                    mb: 3,
                    border: '1px dashed #ff6b6b',
                    minHeight: 100,
                    bgcolor: '#fff'
                }}
            >
                <Typography variant="body1" sx={{ color: '#666' }}>
                    {project.description}
                </Typography>
            </Paper>

            {/* Metadata */}
            <Paper
                sx={{
                    p: 2,
                    mb: 3,
                    border: '1px dashed #ff6b6b',
                    display: 'flex',
                    gap: 4
                }}
            >
                <Box>
                    <Typography variant="caption" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                        Due Date
                    </Typography>
                    <Typography variant="body2">
                        {new Date(project.dueDate).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                        Updated At
                    </Typography>
                    <Typography variant="body2">
                        {new Date(project.updatedAt).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                        Created At
                    </Typography>
                    <Typography variant="body2">
                        {new Date(project.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
            </Paper>

            {/* Task List Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#ff6b6b' }}>
                    Task List
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenEditDialog(true)}
                        sx={{
                            borderColor: '#ff9800',
                            color: '#ff9800',
                            '&:hover': {
                                borderColor: '#f57c00',
                                bgcolor: 'rgba(255, 152, 0, 0.1)'
                            }
                        }}
                    >
                        Edit Project
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenCreateTaskDialog(true)}
                        sx={{
                            borderColor: '#ff9800',
                            color: '#ff9800',
                            '&:hover': {
                                borderColor: '#f57c00',
                                bgcolor: 'rgba(255, 152, 0, 0.1)'
                            }
                        }}
                    >
                        Create New Task
                    </Button>
                </Box>
            </Box>

            {/* Task Table */}
            <TableContainer component={Paper} sx={{ border: '2px solid #ff6b6b' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>Due Date</TableCell>
                            <TableCell sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>Updated At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {project.tasks?.map((task) => (
                            <TableRow
                                key={task.id}
                                onClick={() => handleTaskClick(task.id)}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 107, 107, 0.1)'
                                    }
                                }}
                            >
                                <TableCell sx={{ color: '#ff6b6b' }}>{task.title}</TableCell>
                                <TableCell sx={{ color: '#ff6b6b' }}>{task.status}</TableCell>
                                <TableCell sx={{ color: '#ff6b6b' }}>
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell sx={{ color: '#ff6b6b' }}>
                                    {new Date(task.updatedAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Project Dialog */}
            <Dialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <ProjectForm
                    project={project}
                    onSubmit={handleEditProject}
                    onCancel={() => setOpenEditDialog(false)}
                />
            </Dialog>

            {/* Create Task Dialog */}
            <Dialog
                open={openCreateTaskDialog}
                onClose={() => setOpenCreateTaskDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <TaskForm
                    onSubmit={handleCreateTask}
                    onCancel={() => setOpenCreateTaskDialog(false)}
                />
            </Dialog>
        </Box>
    );
}
