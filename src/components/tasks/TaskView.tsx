import { Box, Button, Dialog, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { Task } from '../../types/project';
import TaskForm from './TaskForm';

interface TaskViewProps {
    task?: Task;
}

export default function TaskView({ task }: TaskViewProps) {
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleEditTask = (data: any) => {
        console.log('Edit task:', data);
        setOpenEditDialog(false);
    };

    if (!task) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>No task selected</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Task Title */}
            <Typography variant="h4" sx={{ color: '#ff6b6b', mb: 3 }}>
                {task.title}
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
                    {task.description}
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
                        Status
                    </Typography>
                    <Typography variant="body2">
                        {task.status}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                        Due Date
                    </Typography>
                    <Typography variant="body2">
                        {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                        Updated At
                    </Typography>
                    <Typography variant="body2">
                        {new Date(task.updatedAt).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                        Created At
                    </Typography>
                    <Typography variant="body2">
                        {new Date(task.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
            </Paper>

            {/* Edit Task Button */}
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
                Edit Task
            </Button>

            {/* Edit Task Dialog */}
            <Dialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <TaskForm
                    task={task}
                    onSubmit={handleEditTask}
                    onCancel={() => setOpenEditDialog(false)}
                />
            </Dialog>
        </Box>
    );
}
