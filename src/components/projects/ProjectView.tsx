import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createTask, fetchProjectById, updateProject } from '../../store/slices/projectSlice';
import { CreateTaskRequest, UpdateProjectRequest } from '../../types/project';
import TaskForm from '../tasks/TaskForm';
import ProjectForm from './ProjectForm';

type SortField = 'dueDate' | 'updatedAt';
type SortOrder = 'asc' | 'desc';

export default function ProjectView() {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false);
    const [sortField, setSortField] = useState<SortField>('updatedAt');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { projects, isLoading } = useAppSelector((state) => state.projects);
    const project = projects.find(p => p.id === Number(projectId));

    useEffect(() => {
        if (projectId) {
            dispatch(fetchProjectById(Number(projectId)));
        }
    }, [dispatch, projectId]);

    const handleEditProject = async (data: UpdateProjectRequest) => {
        if (projectId) {
            await dispatch(updateProject({ projectId: Number(projectId), data }));
            setOpenEditDialog(false);
        }
    };

    const handleCreateTask = async (data: CreateTaskRequest) => {
        if (projectId) {
            await dispatch(createTask({ projectId: Number(projectId), data }));
            setOpenCreateTaskDialog(false);
        }
    };

    const handleTaskClick = (taskId: number) => {
        navigate(`/projects/${projectId}/tasks/${taskId}`);
    };

    const handleSort = (field: SortField) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortField(field);
    };

    const sortedTasks = project?.tasks ? [...project.tasks].sort((a, b) => {
        const aValue = new Date(a[sortField]).getTime();
        const bValue = new Date(b[sortField]).getTime();
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }) : [];

    if (isLoading) {
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#616161' }} />
            </Box>
        );
    }

    if (!project) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Project not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            {/* Project Title */}
            <Typography variant="h4" sx={{ color: '#424242', mb: 4, fontWeight: 500 }}>
                {project.title}
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
                    {project.description}
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
                        Due Date
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#424242', mt: 0.5 }}>
                        {new Date(project.dueDate).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600, textTransform: 'uppercase' }}>
                        Updated At
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#424242', mt: 0.5 }}>
                        {new Date(project.updatedAt).toLocaleDateString()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600, textTransform: 'uppercase' }}>
                        Created At
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#424242', mt: 0.5 }}>
                        {new Date(project.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
            </Paper>

            {/* Task List Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ color: '#424242', fontWeight: 500 }}>
                    Task List
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenEditDialog(true)}
                        sx={{
                            borderColor: '#bdbdbd',
                            color: '#616161',
                            '&:hover': {
                                borderColor: '#757575',
                                bgcolor: 'rgba(0, 0, 0, 0.04)'
                            },
                            textTransform: 'none'
                        }}
                    >
                        Edit Project
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setOpenCreateTaskDialog(true)}
                        sx={{
                            bgcolor: '#616161',
                            color: '#fff',
                            '&:hover': {
                                bgcolor: '#424242'
                            },
                            textTransform: 'none'
                        }}
                    >
                        Create New Task
                    </Button>
                </Box>
            </Box>

            {/* Task Table */}
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#fafafa' }}>
                            <TableCell sx={{ color: '#616161', fontWeight: 600 }}>Title</TableCell>
                            <TableCell sx={{ color: '#616161', fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ color: '#616161', fontWeight: 600 }}>
                                <TableSortLabel
                                    active={sortField === 'dueDate'}
                                    direction={sortField === 'dueDate' ? sortOrder : 'asc'}
                                    onClick={() => handleSort('dueDate')}
                                    sx={{
                                        '&.MuiTableSortLabel-root': {
                                            color: '#616161',
                                        },
                                        '&.MuiTableSortLabel-root:hover': {
                                            color: '#424242',
                                        },
                                        '&.Mui-active': {
                                            color: '#424242',
                                        },
                                        '& .MuiTableSortLabel-icon': {
                                            color: '#424242 !important',
                                        },
                                    }}
                                >
                                    Due Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: '#616161', fontWeight: 600 }}>
                                <TableSortLabel
                                    active={sortField === 'updatedAt'}
                                    direction={sortField === 'updatedAt' ? sortOrder : 'asc'}
                                    onClick={() => handleSort('updatedAt')}
                                    sx={{
                                        '&.MuiTableSortLabel-root': {
                                            color: '#616161',
                                        },
                                        '&.MuiTableSortLabel-root:hover': {
                                            color: '#424242',
                                        },
                                        '&.Mui-active': {
                                            color: '#424242',
                                        },
                                        '& .MuiTableSortLabel-icon': {
                                            color: '#424242 !important',
                                        },
                                    }}
                                >
                                    Updated At
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTasks.map((task) => (
                            <TableRow
                                key={task.id}
                                onClick={() => handleTaskClick(task.id)}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: '#f5f5f5'
                                    }
                                }}
                            >
                                <TableCell sx={{ color: '#424242' }}>{task.title}</TableCell>
                                <TableCell sx={{ color: '#616161' }}>{task.status}</TableCell>
                                <TableCell sx={{ color: '#616161' }}>
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell sx={{ color: '#616161' }}>
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
