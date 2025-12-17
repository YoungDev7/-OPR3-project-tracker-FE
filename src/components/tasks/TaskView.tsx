import { Box, Button, CircularProgress, Dialog, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTask, fetchProjectById, updateTask } from '../../store/slices/projectSlice';
import { CreateTaskRequest, TaskStatus, UpdateTaskRequest } from '../../types/project';
import TaskForm from './TaskForm';

export default function TaskView() {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { projects, isLoading } = useAppSelector((state) => state.projects);
    const project = projects.find(p => p.id === Number(projectId));
    const task = project?.tasks.find(t => t.id === Number(taskId));

    useEffect(() => {
        if (projectId && !project) {
            dispatch(fetchProjectById(Number(projectId)));
        }
    }, [dispatch, projectId, project]);

    const handleEditTask = async (data: CreateTaskRequest | UpdateTaskRequest) => {
        if (projectId && taskId) {
            // Ensure status is always provided for update
            const updateData: UpdateTaskRequest = {
                title: data.title,
                description: data.description,
                status: data.status || task?.status || TaskStatus.TODO,
                dueDate: data.dueDate
            };
            await dispatch(updateTask({
                projectId: Number(projectId),
                taskId: Number(taskId),
                data: updateData
            }));
            setOpenEditDialog(false);
        }
    };

    const handleDeleteTask = async () => {
        if (projectId && taskId && window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
            await dispatch(deleteTask({
                projectId: Number(projectId),
                taskId: Number(taskId)
            }));
            navigate(`/projects/${projectId}`);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#616161' }} />
            </Box>
        );
    }

    if (!task) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Task not found</Typography>
                <Button onClick={() => navigate(`/projects/${projectId}`)} sx={{ mt: 2 }}>
                    Back to Project
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            {/* Task Title */}
            <Typography variant="h4" sx={{ color: '#424242', mb: 4, fontWeight: 500 }}>
                {task.title}
            </Typography>

            {/* Description Box */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    border: '1px solid #e0e0e0',
                    minHeight: 100,
                    bgcolor: '#fff'
                }}
            >
                <Typography variant="body1" sx={{ color: '#616161', lineHeight: 1.8 }}>
                    {task.description}
                </Typography>
            </Paper>

            {/* Metadata */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    gap: 4
                }}
            >
                <Box>
                    <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600, textTransform: 'uppercase' }}>
                        Status
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#424242', mt: 0.5 }}>
                        {task.status}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600, textTransform: 'uppercase' }}>
                        Due Date
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#424242', mt: 0.5 }}>
                        {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600, textTransform: 'uppercase' }}>
                        Updated At
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#424242', mt: 0.5 }}>
                        {new Date(task.updatedAt).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600, textTransform: 'uppercase' }}>
                        Created At
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#424242', mt: 0.5 }}>
                        {new Date(task.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
            </Paper>

            {/* Edit Task Button */}
            <Button
                variant="contained"
                onClick={() => setOpenEditDialog(true)}
                sx={{
                    bgcolor: '#616161',
                    color: '#fff',
                    '&:hover': {
                        bgcolor: '#424242'
                    },
                    textTransform: 'none',
                    px: 3
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
                    onDelete={handleDeleteTask}
                />
            </Dialog>
        </Box>
    );
}
